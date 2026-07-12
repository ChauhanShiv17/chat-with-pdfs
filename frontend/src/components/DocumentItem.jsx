import { FileText } from "lucide-react";

function DocumentItem({ doc, active, onClick }) {
  return (
    <button
      className={`doc-item ${active ? "doc-item-active" : ""}`}
      onClick={onClick}
    >
      <FileText size={15} strokeWidth={2} />
      <span className="doc-name">{doc.name}</span>
    </button>
  );
}

export default DocumentItem;
