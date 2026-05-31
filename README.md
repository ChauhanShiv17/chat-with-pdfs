# Chat With PDFs

An AI-powered PDF Question Answering system built using React, FastAPI, ChromaDB, and Sentence Transformers.

## Features

- Upload PDF documents
- Extract text from PDFs
- Automatic text chunking
- Generate vector embeddings
- Store embeddings in ChromaDB
- Semantic search over uploaded PDFs
- Ask questions in natural language
- React-based frontend
- FastAPI backend

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript

### Backend
- FastAPI
- Python

### AI & Vector Search
- Sentence Transformers
- ChromaDB
- PyMuPDF

## Project Architecture

```text
User Uploads PDF
        ↓
FastAPI Backend
        ↓
PyMuPDF Text Extraction
        ↓
Text Chunking
        ↓
SentenceTransformer Embeddings
        ↓
ChromaDB Vector Storage
        ↓
Semantic Search
        ↓
Answer Returned to User
```

## Installation

### Clone Repository

```bash
git clone https://github.com/ChauhanShiv17/chat-with-pdfs.git
cd chat-with-pdfs
```

### Backend Setup

```bash
python -m venv venv
```

Activate Environment

```bash
venv\Scripts\activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Run Backend

```bash
python -m uvicorn app:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## API Endpoints

### Upload PDF

```http
POST /upload
```

### Ask Question

```http
POST /ask
```

Example Request:

```json
{
  "question": "What is mobile application?"
}
```

## Future Improvements

- Multiple PDF support
- ChatGPT-style interface
- Ollama integration
- Source citations
- Chat history
- Authentication
- Cloud deployment

## Author

Shiv Kumar

B.Tech Computer Science  
National Institute of Technology Kurukshetra