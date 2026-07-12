import { FileText, Sparkles, UploadCloud, X, Loader2, CheckCircle2, XCircle } from "lucide-react";

function statusIcon(status) {
  if (status === "uploading") return <Loader2 size={14} className="spin" />;
  if (status === "ready") return <CheckCircle2 size={14} />;
  if (status === "failed") return <XCircle size={14} />;
  return null;
}

function Sidebar({ fileName, uploadStatus, onFileSelect, onRemoveFile, isOpen, onClose }) {
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <>
      {isOpen && <div className="sidebar-scrim" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <Sparkles size={18} strokeWidth={2.2} />
          </div>
          <div className="brand-text">
            <span className="brand-name">Chat with PDF</span>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-section-title">Document</p>

          {!fileName && (
            <label className="upload-dropzone">
              <UploadCloud size={22} strokeWidth={1.8} />
              <span>Click to upload a PDF</span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden-file-input"
                onChange={handleChange}
              />
            </label>
          )}

          {fileName && (
            <div className={`sidebar-doc-card sidebar-doc-card-${uploadStatus}`}>
              <div className="sidebar-doc-card-icon">
                <FileText size={16} />
              </div>
              <div className="sidebar-doc-card-meta">
                <span className="sidebar-doc-name">{fileName}</span>
                <span className="sidebar-doc-status">
                  {statusIcon(uploadStatus)}
                  {uploadStatus}
                </span>
              </div>
              <button className="icon-btn" aria-label="Remove document" onClick={onRemoveFile}>
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
