import BASE_URL from "./api";

export async function fetchPuzzles() {

  try {

    const response =
      await fetch(`${BASE_URL}/puzzles`);

    if (!response.ok)
      throw new Error("Failed to fetch puzzles");

    const data =
      await response.json();

    console.log("Fetched puzzles:", data);

    return data;

  } catch (err) {

    console.error("Fetch error:", err);

    return [];

  }

}

export async function saveProgressBatch(batch) {

  try {

    await fetch(`${BASE_URL}/puzzles/progress`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        progress: batch
      })

    });

  } catch (err) {

    console.error("Progress save error:", err);

  }

}
