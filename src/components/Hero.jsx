import React from "react";

export default function Hero({ completedCount, onStart }) {
  return (
    <section className="hero-wrap">
      <div className="hero-card">
        <div className="hero-pill">🗺️ <span>Your next big adventure starts here</span></div>
        <h1>Learn something <em>wonderful</em> every day.</h1>
        <p>
          Follow your compass through five magical worlds. Every curious question
          earns stars, points, and a new badge for your explorer pack.
        </p>
        <button className="primary-button" onClick={onStart}>
          🪄 <span>Start exploring</span> <strong>→</strong>
        </button>
        <div className="completion-pill">
          ⭐ <b>{completedCount} of 5</b> worlds completed
        </div>
      </div>
    </section>
  );
}