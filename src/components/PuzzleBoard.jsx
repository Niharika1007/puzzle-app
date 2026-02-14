import React, { useEffect, useState } from "react";

import PuzzleCard from "./PuzzleCard";
import { fetchPuzzles, saveProgressBatch } from "../services/puzzleService";
import { savePuzzleCache, getPuzzleCache } from "../utils/cache";

function PuzzleBoard() {

  const [puzzles, setPuzzles] = useState([]);
  const [progressBatch, setProgressBatch] = useState([]);

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

    const updated = [...progressBatch, id];

    setProgressBatch(updated);

    if (updated.length >= 5) {

      saveProgressBatch(updated);

      setProgressBatch([]);

    }

  }

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
