import React, { useMemo, useState } from "react";

export default function Quest({ world, progress, onResult, onComplete, onBack }) {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);
  const question = world.questions[index];
  const pct = Math.round(((index + (finished ? 1 : 0)) / world.questions.length) * 100);

  const alreadyDone = useMemo(() => progress.completed.includes(world.id), [progress.completed, world.id]);

  function checkAnswer() {
    if (!choice) return;
    const correct = choice === question.answer;
    setFeedback(correct ? "correct" : "wrong");
    onResult(world.id, correct);
  }

  

function next() {
  setChoice("");
  setFeedback(null);

  if (index < world.questions.length - 1) {
    setIndex(i => i + 1);
  } else {
    onComplete(world.id);
    setFinished(true);
  }
}



  if (finished) {
    return (
      <div className="quest-shell">
        <div className="quest-complete">
          <div className="big-badge">{world.badge}</div>
          <div className="purple-kicker">ADVENTURE COMPLETE</div>
          <h1>Great exploring! 🎉</h1>
          <p>You finished <b>{world.title}</b>. Keep going to discover the next world.</p>
          <div className="reward-row">
            <div>⭐ <b>+{world.questions.length}</b><small> stars</small></div>
            <div>✨ <b>+{world.questions.length * 100}</b><small> points</small></div>
          </div>
          <button className="primary-button" onClick={onBack}>Back to explorer map →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quest-shell">
      <header className="quest-header">
        <button className="back-button" onClick={onBack}>← Map</button>
        <div className="quest-title">
          <span className={`quest-world-icon ${world.color}`}>{world.icon}</span>
          <div><b>{world.title}</b><small>{alreadyDone ? "World completed" : "Mini quest"}</small></div>
        </div>
        <div className="quest-stars">⭐ {progress.stars}</div>
      </header>

      <main className="quest-main">
        <div className="quest-progress-row">
          <div className="progress-track"><div style={{width: `${Math.max(12, pct)}%`}} /></div>
          <b>{index + 1} MINI QUEST{world.questions.length > 1 ? "S" : ""}</b>
        </div>

        <section className="question-card">
          <div className="mini-kicker">MINI QUEST</div>
          <h1>{question.q}</h1>
          <p>Tap the answer that feels right, then check your explorer skills.</p>

          <div className="options">
            {question.options.map(option => (
              <button
                key={option}
                className={`option ${choice === option ? "selected" : ""} ${feedback && option === question.answer ? "answer" : ""}`}
                onClick={() => !feedback && setChoice(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback === "correct" && <div className="feedback success">🎉 Brilliant! You found the right answer.</div>}
          {feedback === "wrong" && <div className="feedback error">💡 Nice try! The highlighted answer is the one to remember.</div>}

          <div className="quest-actions">
            {!feedback ? (
              <>
                <button className="primary-button" disabled={!choice} onClick={checkAnswer}>Check my answer ✓</button>
                <button className="hint-button" onClick={() => alert(question.hint)}>❔ Hint</button>
              </>
            ) : (
              <button className="primary-button" onClick={next}>
                {index === world.questions.length - 1 ? "Finish world" : "Next quest"} →
              </button>
            )}
          </div>
        </section>

        <section className="quest-progress-card">
          <div className="purple-kicker">EXPLORER PACK</div>
          <h2>Your progress</h2>
          <div className="quest-stats"><span>✨ {progress.points} points</span><span>⭐ {progress.stars} stars</span></div>
        </section>

        <section className="tip-card">
          <div className="tip-icon">🌟</div>
          <div><h3>Tiny steps make big discoveries</h3><p>There is no wrong way to explore. Try a hint whenever you need one.</p></div>
        </section>
      </main>
    </div>
  );
}