import { UploadCloud, MessageCircleQuestion, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: UploadCloud,
    title: "Upload your PDF",
    text: "Add a document from the sidebar to get started.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Ask a question",
    text: "Type anything you want to know about its content.",
  },
  {
    icon: Sparkles,
    title: "Get an AI answer",
    text: "Claude reads the relevant sections and replies with sources.",
  },
];

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Sparkles size={26} strokeWidth={1.8} />
      </div>
      <h2>What would you like to know?</h2>
      <p>Upload a PDF and ask questions about its content.</p>

      <div className="how-it-works">
        {STEPS.map((step, i) => (
          <div className="how-step" key={step.title}>
            <div className="how-step-number">{i + 1}</div>
            <div className="how-step-icon">
              <step.icon size={18} strokeWidth={1.8} />
            </div>
            <div className="how-step-text">
              <span className="how-step-title">{step.title}</span>
              <span className="how-step-desc">{step.text}</span>
            </div>
            {i < STEPS.length - 1 && <div className="how-step-connector" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmptyState;
