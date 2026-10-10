
import React, { useEffect, useMemo, useState } from "react";
import { worlds } from "./data/worlds";
import { defaultProgress, loadProgress, saveProgress } from "./utils";
import Header from "./components/Header";
import WorldMap from "./components/WorldMap";
import ProgressCard from "./components/ProgressCard";
import FooterTip from "./components/FooterTip";
import Quest from "./pages/Quest";

export default function App() {
  const [progress, setProgress] = useState(loadProgress);
  const [selectedWorld, setSelectedWorld] = useState(null);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const visibleWorlds = useMemo(
    () =>
      worlds.map(world => ({
        ...world,
        unlocked: true
      })),
    []
  );

  function addResult(worldId, correct) {
    setProgress(prev => ({
      ...prev,
      stars: correct ? Math.min(15, prev.stars + 1) : prev.stars,
      points: correct ? prev.points + 100 : prev.points + 20
    }));
  }

  function completeWorld(worldId) {
    setProgress(prev => {
      const completed = prev.completed.includes(worldId)
        ? prev.completed
        : [...prev.completed, worldId];

      const badges = prev.badges.includes(worldId)
        ? prev.badges
        : [...prev.badges, worldId];

      return { ...prev, completed, badges };
    });
  }

  function resetProgress() {
    setProgress(defaultProgress);
    setSelectedWorld(null);
  }

  if (selectedWorld) {
    return (
      <Quest
        world={selectedWorld}
        progress={progress}
        onResult={addResult}
        onComplete={completeWorld}
        onBack={() => setSelectedWorld(null)}
      />
    );
  }

  return (
    <div className="app-shell">
      <Header onReset={resetProgress} />
      <main>
        <WorldMap
          worlds={visibleWorlds}
          onSelect={setSelectedWorld}
        />
        <ProgressCard progress={progress} />
        <FooterTip />
      </main>
      <footer className="site-footer">
        Adventure Learning World · Learn, explore, and have fun ✨
      </footer>
    </div>
  );
}
