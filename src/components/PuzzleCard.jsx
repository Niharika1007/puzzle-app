import React from "react";

function PuzzleCard({ puzzle, onSolve }) {
  return (
    <div
      className={`bg-white p-4 rounded shadow w-full sm:w-80 ${
        puzzle.solved ? "opacity-50" : ""
      }`}
    >
      <h2 className="text-lg font-bold mb-2">Puzzle #{puzzle.id}</h2>
      <p className="mb-4">{puzzle.question}</p>
      {!puzzle.solved && (
        <button
          onClick={() => onSolve(puzzle.id)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Mark as Solved
        </button>
      )}
      {puzzle.solved && <span className="text-green-700 font-bold">Solved!</span>}
    </div>
  );
}

export default PuzzleCard;
