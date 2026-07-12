import { Menu, Sun, Moon, Trash2 } from "lucide-react";

function Header({ serverOnline, onToggleTheme, isDark, onClearChat, onToggleSidebar }) {
  return (
    <header className="chat-header">
      <div className="chat-header-left">
        <button className="icon-btn sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <Menu size={18} />
        </button>
        <div>
          <h1 className="chat-header-title">Ask your document</h1>
          <p className="chat-header-subtitle">AI-powered document assistant</p>
        </div>
      </div>

      <div className="chat-header-right">
        <div className="status-badge">
          <span className={`status-dot ${serverOnline ? "status-dot-online" : "status-dot-offline"}`} />
          {serverOnline ? "Online" : "Offline"}
        </div>
        <button className="icon-btn" onClick={onToggleTheme} aria-label="Toggle theme">
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="icon-btn" onClick={onClearChat} aria-label="Clear chat">
          <Trash2 size={16} />
        </button>
      </div>
    </header>
  );
}

export default Header;
