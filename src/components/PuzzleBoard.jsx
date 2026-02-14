import React, { useEffect, useState } from "react";
import PuzzleCard from "./PuzzleCard";
import { fetchPuzzles, saveProgressBatch } from "../services/api";
import { savePuzzleCache, getPuzzleCache } from "../utils/cache";

function PuzzleBoard() {
  const [puzzles, setPuzzles] = useState([]);

  useEffect(() => {
    async function init() {
      try {
        const cached = getPuzzleCache();
        if (cached.length > 0) {
          setPuzzles(cached);
          return;
        }

        const data = await fetchPuzzles();
        setPuzzles(data);
        savePuzzleCache(data);
      } catch (error) {
        console.error(error);
      }
    }
    init();
  }, []);

  function handleSolve(id) {
    saveProgressBatch([id]);
    setPuzzles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, solved: true } : p))
    );
  }

  return (
    <div className="flex flex-wrap gap-4">
      {puzzles.map((puzzle) => (
        <PuzzleCard key={puzzle.id} puzzle={puzzle} onSolve={handleSolve} />
      ))}
    </div>
  );
}

export default PuzzleBoard;
