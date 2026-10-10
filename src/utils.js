export const defaultProgress = {
  points: 0,
  stars: 0,
  completed: [],
  badges: []
};

export function loadProgress() {
  try {
    const saved = localStorage.getItem("adventure-progress");
    return saved ? { ...defaultProgress, ...JSON.parse(saved) } : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress) {
  localStorage.setItem("adventure-progress", JSON.stringify(progress));
}