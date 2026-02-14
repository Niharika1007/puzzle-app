import { useState, useEffect } from "react";
import { fetchPuzzles } from "../services/puzzleService";

export default function usePuzzle() {

  const [puzzles, setPuzzles] = useState([]);

  useEffect(() => {

    fetchPuzzles().then(setPuzzles);

  }, []);

  return puzzles;

}
