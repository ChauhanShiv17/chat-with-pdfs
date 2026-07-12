function SuggestedPrompt({ icon: Icon, text, onClick }) {
  return (
    <button className="prompt-card" onClick={() => onClick(text)}>
      <span className="prompt-card-icon">
        <Icon size={16} strokeWidth={2} />
      </span>
      <span>{text}</span>
    </button>
  );
}

export default SuggestedPrompt;
