const COUNT_KEY = "puzzleCompletionCount";

export const incrementPuzzleCompletion = async () => {
  let count = parseInt(localStorage.getItem(COUNT_KEY)) || 0;

  count += 1;

  localStorage.setItem(COUNT_KEY, count);

  if (count % 5 === 0) {
    await syncProgress();
  }
};

const syncProgress = async () => {
  try {
    const BACKEND_URL =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    await fetch(`${BACKEND_URL}/sync`, {
      method: "POST",
    });

    console.log("Progress synced");
  } catch (error) {
    console.error("Sync error:", error);
  }
};
