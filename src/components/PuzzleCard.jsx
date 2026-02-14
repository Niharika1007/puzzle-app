import React from "react";

function PuzzleCard({ puzzle, onSolve }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-80 hover:shadow-2xl transition duration-300">
      <h2 className="text-xl font-semibold mb-2">Puzzle #{puzzle.id}</h2>
      <p className="mb-4 text-gray-700">{puzzle.question}</p>
      <button
        onClick={() => onSolve(puzzle.id)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Mark as Solved
      </button>
    </div>
  );
}

export default PuzzleCard;
