const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export async function fetchPuzzles() {

  try {

    const response = await fetch(`${BACKEND_URL}/puzzles`);

    if (!response.ok) {

      throw new Error("Failed to fetch puzzles");

    }

    const data = await response.json();

    return data;

  } catch (error) {

    console.error("Fetch puzzles error:", error);

    const cached = localStorage.getItem("puzzleCache");

    return cached ? JSON.parse(cached) : [];

  }

}

export async function saveProgressBatch(progressArray) {

  try {

    await fetch(`${BACKEND_URL}/puzzles/progress`, {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

      },

      body: JSON.stringify({

        progress: progressArray,

      }),

    });

    console.log("Progress synced");

  } catch (error) {

    console.error("Progress sync failed:", error);

  }

}
