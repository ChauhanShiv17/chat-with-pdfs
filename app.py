from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import os
import fitz
import chromadb
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import ollama

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

chroma_client = chromadb.PersistentClient(path="chroma_db")
collection = chroma_client.get_or_create_collection(name="pdf_chunks")

model = SentenceTransformer("all-MiniLM-L6-v2")


class QuestionRequest(BaseModel):
    question: str


def create_chunks(text, chunk_size=300, overlap=50):
    words = text.split()
    chunks = []
    start = 0

    while start < len(words):
        end = start + chunk_size
        chunk = " ".join(words[start:end])
        chunks.append(chunk)
        start = end - overlap

    return chunks


@app.get("/")
def home():
    return {"message": "Backend Running"}


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    doc = fitz.open(file_path)
    text = ""

    for page in doc:
        text += page.get_text()

    chunks = create_chunks(text)

    ids = []
    embeddings = []
    documents = []
    metadatas = []

    for i, chunk in enumerate(chunks):
        ids.append(f"{file.filename}_{i}")
        embeddings.append(model.encode(chunk).tolist())
        documents.append(chunk)
        metadatas.append({
            "filename": file.filename,
            "chunk_number": i
        })

    collection.upsert(
        ids=ids,
        embeddings=embeddings,
        documents=documents,
        metadatas=metadatas
    )

    return {
        "message": "PDF uploaded and stored in vector database",
        "filename": file.filename,
        "total_chunks": len(chunks)
    }


@app.post("/ask")
def ask_question(request: QuestionRequest):
    question_embedding = model.encode(request.question).tolist()

    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=4
    )

    matched_chunks = results["documents"][0]
    sources = results["metadatas"][0]

    if not matched_chunks:
        return {
            "question": request.question,
            "answer": "No matching content found. Please upload a PDF first.",
            "sources": []
        }

    context = "\n\n---\n\n".join(matched_chunks)

    system_prompt = (
        "You are a helpful assistant that answers questions using only the "
        "provided context from a PDF document. If the answer isn't in the "
        "context, say you don't know based on the document. Be concise."
    )

    user_prompt = f"Context:\n{context}\n\nQuestion: {request.question}"

    ollama_response = ollama.chat(
        model="phi3:latest",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )

    answer = ollama_response["message"]["content"]

    return {
        "question": request.question,
        "answer": answer,
        "sources": sources
    }