import React, { useState } from "react";

function PuzzleCard({ puzzle, onSolve }) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!answer.trim()) {
      setError("Please enter an answer");
      return;
    }

    // compare with correct answer
    if (
      puzzle.answer &&
      answer.trim().toLowerCase() === puzzle.answer.toLowerCase()
    ) {
      onSolve(puzzle.id);
      setError("");
    } else {
      setError("Wrong answer ❌");
    }
  }

  return (
    <div
      className={`bg-white p-4 rounded shadow w-full sm:w-80 ${
        puzzle.solved ? "opacity-50" : ""
      }`}
    >
      <h2 className="text-lg font-bold mb-2">
        Puzzle #{puzzle.id}
      </h2>

      <p className="mb-3">{puzzle.question}</p>

      {!puzzle.solved ? (
        <>
          <input
            type="text"
            placeholder="Enter your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />

          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Submit Answer
          </button>

          {error && (
            <p className="text-red-500 mt-2">{error}</p>
          )}
        </>
      ) : (
        <span className="text-green-700 font-bold">
          Solved ✅
        </span>
      )}
    </div>
  );
}

export default PuzzleCard;
