const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function fetchPuzzles() {
  try {
    const res = await fetch(`${BASE_URL}/puzzles`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch puzzles");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function saveProgressBatch(batch) {
  try {
    await fetch(`${BASE_URL}/puzzles/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ progress: batch }),
    });
  } catch (err) {
    console.error(err);
  }
}
