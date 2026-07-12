import { MessageSquare } from "lucide-react";

function ChatHistoryItem({ chat, active, onClick }) {
  return (
    <button
      className={`chat-history-item ${active ? "chat-history-item-active" : ""}`}
      onClick={onClick}
    >
      <MessageSquare size={14} strokeWidth={2} />
      <span className="chat-history-title">{chat.title}</span>
    </button>
  );
}

export default ChatHistoryItem;
