import React from "react";
import { worlds } from "../data/worlds";

export default function ProgressCard({ progress }) {
  return (
    <section className="progress-card">
      <div className="progress-heading">
        <div>
          <div className="purple-kicker">EXPLORER PACK</div>
          <h2>Your progress</h2>
        </div>
        <div className="compass-badge">🧭</div>
      </div>

      <div className="stat-grid">
        <div className="stat"><span>✨</span><strong>{progress.points}</strong><small>points</small></div>
        <div className="stat"><span>⭐</span><strong>{progress.stars}</strong><small>stars</small></div>
      </div>

      <hr />
      <h3 className="badges-title">Badges collected</h3>
      <div className="badges">
        {worlds.map(w => (
          <div className={`badge ${progress.badges.includes(w.id) ? "earned" : ""}`} key={w.id}>
            {progress.badges.includes(w.id) ? w.badge : "◌"}
          </div>
        ))}
      </div>
      <div className="badge-message">
        🏅 <span>{progress.badges.length ? "Keep exploring to collect every badge!" : "Complete a world to earn its badge."}</span>
      </div>
    </section>
  );
}