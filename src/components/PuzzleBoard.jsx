import React, { useEffect, useState } from "react";
import PuzzleCard from "./PuzzleCard";
import { fetchPuzzles, saveProgressBatch } from "../services/api";
import { savePuzzleCache, getPuzzleCache } from "../utils/cache";

function PuzzleBoard() {
  const [puzzles, setPuzzles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        // Always fetch fresh puzzles first (important for Vercel)
        const data = await fetchPuzzles();

        if (data && data.length > 0) {
          setPuzzles(data);
          savePuzzleCache(data);
        } else {
          // fallback to cache if backend slow (Render cold start)
          const cached = getPuzzleCache();
          setPuzzles(cached);
        }
      } catch (error) {
        console.error("Fetch error:", error);

        // fallback to cache on error
        const cached = getPuzzleCache();
        setPuzzles(cached);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  async function handleSolve(id) {
    try {
      await saveProgressBatch([id]);

      const updated = puzzles.map((p) =>
        p.id === id ? { ...p, solved: true } : p
      );

      setPuzzles(updated);

      // update cache too
      savePuzzleCache(updated);

    } catch (err) {
      console.error("Solve error:", err);
    }
  }

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg">
        Loading puzzles...
      </div>
    );
  }

  if (!puzzles.length) {
    return (
      <div className="text-center mt-10 text-red-500">
        No puzzles found.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {puzzles.map((puzzle) => (
        <PuzzleCard
          key={puzzle.id}
          puzzle={puzzle}
          onSolve={handleSolve}
        />
      ))}
    </div>
  );
}

export default PuzzleBoard;
