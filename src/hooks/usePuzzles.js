import { useState, useEffect } from "react";
import { fetchPuzzles, saveProgressBatch } from "../services/puzzleService";
import { getPuzzleCache, savePuzzleCache } from "../utils/cache";

export default function usePuzzle() {

  const [puzzles, setPuzzles] = useState([]);
  const [solvedBatch, setSolvedBatch] = useState([]);

  useEffect(() => {

    async function load() {

      try {

        const cached = getPuzzleCache();

        if (cached.length > 0) {
          console.log("Loaded from cache");
          setPuzzles(cached);
          return;
        }

        const data = await fetchPuzzles();

        console.log("Loaded from API:", data);

        setPuzzles(data);

        savePuzzleCache(data);

      } catch (err) {

        console.error(err);

      }

    }

    load();

  }, []);

  const markSolved = async (id) => {

    const updated = [...solvedBatch, id];

    setSolvedBatch(updated);

    if (updated.length >= 5) {

      await saveProgressBatch(updated);

      setSolvedBatch([]);

    }

  };

  return {

    puzzles,
    markSolved

  };

}
