import express from "express";

const router = express.Router();

const puzzles = [
  { id: 1, question: "What is 2 + 2?", answer: "4" },
  { id: 2, question: "What is 5 × 3?", answer: "15" },
  { id: 3, question: "What is 10 − 4?", answer: "6" },
  { id: 4, question: "What is 9 ÷ 3?", answer: "3" },
  { id: 5, question: "What is 7 + 6?", answer: "13" }
];

// send puzzles WITHOUT answers for security
router.get("/", (req, res) => {
  const safePuzzles = puzzles.map(({ answer, ...rest }) => rest);
  res.json(safePuzzles);
});

// validate answer
router.post("/validate", (req, res) => {

  const { id, answer } = req.body;

  const puzzle = puzzles.find(p => p.id === id);

  if (!puzzle) {
    return res.status(404).json({ correct: false });
  }

  const correct =
    puzzle.answer.toString().trim() === answer.toString().trim();

  res.json({ correct });

});

export default router;
