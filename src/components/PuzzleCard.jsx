import React, { useState } from "react";
import { validateAnswer } from "../services/api";

function PuzzleCard({ puzzle, onSolve }) {

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit() {

    const result = await validateAnswer(puzzle.id, answer);

    if (result.correct) {

      onSolve(puzzle.id);

      setError("");

    } else {

      setError("Wrong answer");

    }
  }

  return (

    <div className="bg-white p-4 rounded shadow w-full sm:w-80">

      <h2 className="text-lg font-bold mb-2">
        Puzzle #{puzzle.id}
      </h2>

      <p className="mb-2">
        {puzzle.question}
      </p>

      {!puzzle.solved && (

        <>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border p-2 w-full mb-2"
            placeholder="Enter answer"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>

          {error && (
            <p className="text-red-500 mt-2">{error}</p>
          )}
        </>
      )}

      {puzzle.solved && (
        <p className="text-green-600 font-bold">
          Solved ✓
        </p>
      )}

    </div>

  );

}

export default PuzzleCard;
