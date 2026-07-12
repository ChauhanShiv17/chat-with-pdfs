import { useEffect, useRef } from "react";
import EmptyState from "./EmptyState";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

function ChatArea({ messages, loading, loadingLabel, onRegenerate }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, loading]);

  if (messages.length === 0 && !loading) {
    return (
      <div className="chat-area" ref={containerRef}>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="chat-area" ref={containerRef}>
      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} onRegenerate={onRegenerate} />
        ))}
        {loading && <TypingIndicator label={loadingLabel} />}
      </div>
    </div>
  );
}

export default ChatArea;