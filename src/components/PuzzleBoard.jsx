import React, { useState, useEffect } from "react";
import PuzzleCard from "./PuzzleCard";
import { fetchPuzzles, saveProgressBatch } from "../services/api";
import { savePuzzleCache, getPuzzleCache } from "../utils/cache";

function PuzzleBoard() {
  const [puzzles, setPuzzles] = useState([]);
  const [progressBatch, setProgressBatch] = useState([]);

  useEffect(() => {
    async function init() {
      try {
        // 1️⃣ Check cache first
        const cached = getPuzzleCache();
        if (cached.length > 0) {
          console.log("Using cached puzzles:", cached);
          setPuzzles(cached);
          return;
        }

        // 2️⃣ Fetch from backend
        const data = await fetchPuzzles();
        console.log("Fetched puzzles from backend:", data);

        setPuzzles(data);
        savePuzzleCache(data);
      } catch (error) {
        console.error("Error loading puzzles:", error);
      }
    }

    init();
  }, []);

  const handleSolve = (id) => {
    const updated = [...progressBatch, id];
    setProgressBatch(updated);

    if (updated.length >= 5) {
      saveProgressBatch(updated);
      setProgressBatch([]);
    }
  };

  if (puzzles.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-6">
        Loading puzzles...
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center mt-6 px-4">
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
