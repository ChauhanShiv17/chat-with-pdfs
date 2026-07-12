import { Copy, ThumbsUp, ThumbsDown, RotateCcw, FileText } from "lucide-react";

function MessageBubble({ message, onRegenerate }) {
  const isUser = message.type === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
  };

  if (isUser) {
    return (
      <div className="message message-user">
        <div className="message-bubble message-bubble-user">
          <p>{message.text}</p>
        </div>
        <div className="avatar avatar-user">You</div>
      </div>
    );
  }

  return (
    <div className="message message-ai">
      <div className="avatar avatar-ai">AI</div>
      <div className="message-bubble message-bubble-ai">
        <p>{message.text}</p>

        {message.sources && message.sources.length > 0 && (
          <div className="sources">
            <span className="sources-label">Sources</span>
            <div className="sources-list">
              {message.sources.map((s, i) => (
                <span className="source-chip" key={i}>
                  <FileText size={11} />
                  {s.filename} &middot; chunk {s.chunk_number}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="message-actions">
          <button className="msg-action-btn" onClick={handleCopy} aria-label="Copy">
            <Copy size={13} />
          </button>
          <button className="msg-action-btn" aria-label="Like">
            <ThumbsUp size={13} />
          </button>
          <button className="msg-action-btn" aria-label="Dislike">
            <ThumbsDown size={13} />
          </button>
          <button
            className="msg-action-btn"
            aria-label="Regenerate"
            onClick={() => onRegenerate && onRegenerate(message)}
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
