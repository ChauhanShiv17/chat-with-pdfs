import { Send, Square, Sparkles } from "lucide-react";

function ChatInput({ question, setQuestion, onSend, loading, onStop }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (question.trim() && !loading) onSend();
    }
  };

  return (
    <div className="chat-input-wrap">
      <div className="chat-input-glass">
        <textarea
          rows={1}
          placeholder="Ask anything about your PDF..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <span className="ai-badge">
          <Sparkles size={11} /> AI
        </span>

        {loading ? (
          <button className="send-btn send-btn-stop" onClick={onStop} aria-label="Stop">
            <Square size={14} />
          </button>
        ) : (
          <button
            className="send-btn"
            disabled={!question.trim()}
            onClick={onSend}
            aria-label="Send"
          >
            <Send size={16} />
          </button>
        )}
      </div>

      <p className="disclaimer">
        AI responses may contain mistakes. Verify important information.
      </p>
    </div>
  );
}

export default ChatInput;
