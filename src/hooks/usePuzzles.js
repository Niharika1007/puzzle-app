import { useState, useEffect } from "react";
import { fetchPuzzlesAPI, saveProgressAPI } from "../services/api";

export const usePuzzles = () => {

  const [puzzles, setPuzzles] = useState([]);

  const [solved, setSolved] = useState([]);

  useEffect(() => {

    loadPuzzles();

  }, []);


  const loadPuzzles = async () => {

    try {

      const data = await fetchPuzzlesAPI();

      console.log("Loaded puzzles:", data);

      setPuzzles(data);

    } catch (err) {

      console.error(err);

    }

  };


  const markSolved = async (id) => {

    const updated = [...solved, id];

    setSolved(updated);

    await saveProgressAPI(updated);

  };


  return {

    puzzles,
    solved,
    markSolved,

  };

};
