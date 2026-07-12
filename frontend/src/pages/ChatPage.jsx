import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatArea from "../components/ChatArea";
import ChatInput from "../components/ChatInput";
import { uploadPDF, askQuestion, checkServerStatus } from "../services/api";

let idCounter = 1;
const nextId = () => `m-${idCounter++}`;

function ChatPage() {
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [serverOnline, setServerOnline] = useState(false);

  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Analyzing your document...");

  const [fileName, setFileName] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    checkServerStatus().then((res) => {
      setServerOnline(!res.error);
    });
  }, []);

  const handleFileSelect = async (file) => {
    setFileName(file.name);
    setUploadStatus("uploading");
    try {
      const res = await uploadPDF(file);
      setUploadStatus("ready");
      setFileName(res.filename || file.name);
    } catch (err) {
      setUploadStatus("failed");
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setUploadStatus(null);
  };

  const sendQuestion = async (text) => {
    const q = (text ?? question).trim();
    if (!q) return;

    const userMsg = { id: nextId(), type: "user", text: q };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);
    setLoadingLabel("Analyzing your document...");

    try {
      const data = await askQuestion(q);
      const aiMsg = {
        id: nextId(),
        type: "ai",
        text: data.answer,
        sources: data.sources,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          type: "ai",
          text: "Something went wrong reaching the server. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app-shell ${isDark ? "" : "light-theme"}`}>
      <div className="bg-glow bg-glow-purple" />
      <div className="bg-glow bg-glow-blue" />

      <div className="glass-container">
        <Sidebar
          fileName={fileName}
          uploadStatus={uploadStatus}
          onFileSelect={handleFileSelect}
          onRemoveFile={handleRemoveFile}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="main-panel">
          <Header
            serverOnline={serverOnline}
            isDark={isDark}
            onToggleTheme={() => setIsDark((d) => !d)}
            onClearChat={() => setMessages([])}
            onToggleSidebar={() => setSidebarOpen((s) => !s)}
          />

          <ChatArea
            messages={messages}
            loading={loading}
            loadingLabel={loadingLabel}
            onRegenerate={(msg) => sendQuestion(msg.text)}
          />

          <ChatInput
            question={question}
            setQuestion={setQuestion}
            onSend={() => sendQuestion()}
            loading={loading}
            onStop={() => setLoading(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
