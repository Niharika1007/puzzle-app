import { usePuzzle } from "../hooks/usePuzzle";
import Loader from "./Loader";
import { incrementPuzzleCompletion } from "../services/syncService";

export default function Puzzle() {
  const { puzzle, loading } = usePuzzle();

  if (loading) return <Loader />;

  if (!puzzle)
    return <div>No puzzle available</div>;

  const handleSolve = () => {
    incrementPuzzleCompletion();
    alert("Puzzle completed!");
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {puzzle.question || "Sample Puzzle"}
      </h2>

      <button
        onClick={handleSolve}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Mark Complete
      </button>
    </div>
  );
}
