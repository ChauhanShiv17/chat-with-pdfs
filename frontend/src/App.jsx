import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const uploadPDF = async () => {
    if (!file) {
      alert("Please select a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData,
    });

    alert("PDF uploaded successfully");
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = {
      type: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
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

      const botMessage = {
        type: "bot",
        text: data.answer,
        sources: data.sources,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Something went wrong. Please try again.",
        },
      ]);
    }

    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Chat PDFs</h2>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={uploadPDF}>
          Upload PDF
        </button>

        {file && (
          <p className="filename">
            {file.name}
          </p>
        )}

        <button
          className="clear-btn"
          onClick={() => setMessages([])}
        >
          Clear Chat
        </button>
      </aside>

      <main className="chat-area">
        <div className="header">
          <h1>Chat With Your PDFs</h1>
          <p>Upload a PDF and ask questions from it.</p>
        </div>

        <div className="messages">
          {messages.length === 0 && (
            <p className="empty">
              Ask your first question...
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.type}`}
            >
              <p>{msg.text}</p>

              {msg.sources && (
                <div className="sources">
                  <strong>Sources:</strong>

                  {msg.sources.map((source, i) => (
                    <span key={i}>
                      {source.filename} | Chunk{" "}
                      {source.chunk_number}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="message bot typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="Ask something from your PDF..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && askQuestion()
            }
          />

          <button onClick={askQuestion}>
            Ask
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;