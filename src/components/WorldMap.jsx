import React from "react";

export default function WorldMap({ worlds, onSelect }) {
  return (
    <section className="section" id="world-map">
      <div className="section-kicker">◉ EXPLORER MAP</div>
      <h2>Choose your learning world</h2>
      <p className="section-subtitle">All learning worlds are open. Choose any adventure!</p>

      <div className="world-list">
        {worlds.map((world, index) => (
          <article
            className={`world-card ${world.color} ${world.unlocked ? "unlocked" : "locked"}`}
            key={world.id}
            onClick={() => world.unlocked && onSelect(world)}
            role={world.unlocked ? "button" : undefined}
            tabIndex={world.unlocked ? 0 : -1}
            onKeyDown={e => {
              if (world.unlocked && (e.key === "Enter" || e.key === " ")) onSelect(world);
            }}
          >
            <div className="world-top">
              <div className="world-icon">{world.icon}</div>
              <span className="stop-label">{world.unlocked ? `Stop ${index + 1}` : "🔒"}</span>
            </div>
            <h3>{world.title}</h3>
            <p>{world.unlocked ? world.description : "Complete the next stop to unlock."}</p>
            <div className="enter-label">
              {world.unlocked ? "♧ Enter world" : "Locked"}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}