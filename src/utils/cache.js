export function savePuzzleCache(puzzles) {

  try {

    localStorage.setItem(

      "puzzleCache",

      JSON.stringify(puzzles)

    );

  } catch (error) {

    console.error("Cache save failed:", error);

  }

}

export function getPuzzleCache() {

  try {

    const cached = localStorage.getItem("puzzleCache");

    return cached ? JSON.parse(cached) : [];

  } catch (error) {

    console.error("Cache read failed:", error);

    return [];

  }

}
