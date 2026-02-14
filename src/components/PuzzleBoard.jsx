import React, { useEffect, useState } from "react";
import PuzzleCard from "./PuzzleCard";
import { fetchPuzzles, saveProgressBatch } from "../services/api";
import { savePuzzleCache, getPuzzleCache } from "../utils/cache";

function PuzzleBoard() {

  const [puzzles, setPuzzles] = useState([]);
  const [progressBatch, setProgressBatch] = useState([]);

  useEffect(() => {

    async function init() {

      try {

        console.log("Loading puzzles...");

        const cached = getPuzzleCache();

        if (cached && cached.length > 0) {

          console.log("Loaded from cache:", cached);

          setPuzzles(cached);
          return;
        }

        const data = await fetchPuzzles();

        console.log("Loaded from API:", data);

        setPuzzles(data);

        savePuzzleCache(data);

      } catch (error) {

        console.error("Puzzle load error:", error);

      }

    }

    init();

  }, []);

  function handleSolve(id) {

    const updated = [...progressBatch, id];

    setProgressBatch(updated);

    if (updated.length >= 5) {

      saveProgressBatch(updated);

      setProgressBatch([]);

    }

  }

  if (puzzles.length === 0)
    return <div>Loading puzzles...</div>;

  return (

    <div className="flex flex-wrap gap-4">

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
