import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const uploadPDF = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData,
    });

    alert("PDF Uploaded Successfully");
  };

  const askQuestion = async () => {
    const response = await fetch("http://127.0.0.1:8000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
      }),
    });

    const data = await response.json();
    setAnswer(data.answer);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Chat With PDFs</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={uploadPDF}>
        Upload PDF
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Ask Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "400px" }}
      />

      <button onClick={askQuestion}>
        Ask
      </button>

      <br />
      <br />

      <h3>Answer:</h3>
      <p>{answer}</p>
    </div>
  );
}

export default App;