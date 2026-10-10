import React from "react";

export default function Header({ onReset }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">✦</div>
        <div>
          <div className="brand-title">Adventure</div>
          <div className="brand-subtitle">LEARNING WORLD</div>
        </div>
      </div>
      <div className="header-actions">
        <button className="icon-button compass" aria-label="Explorer">🧭</button>
        <button className="icon-button" aria-label="Reset progress" onClick={onReset}>↻</button>
      </div>
    </header>
  );
}