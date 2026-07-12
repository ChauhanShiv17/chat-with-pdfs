function TypingIndicator({ label = "Analyzing your document..." }) {
  return (
    <div className="message message-ai">
      <div className="avatar avatar-ai">AI</div>
      <div className="message-bubble message-bubble-ai typing-bubble">
        <div className="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="typing-label">{label}</span>
      </div>
    </div>
  );
}

export default TypingIndicator;
