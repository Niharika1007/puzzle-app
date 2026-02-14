import express from "express";

const router = express.Router();

const puzzles = [

  { id: 1, question: "What is 2 + 2?" },
  { id: 2, question: "What is 5 × 3?" },
  { id: 3, question: "What is 10 − 4?" },
  { id: 4, question: "What is 9 ÷ 3?" },
  { id: 5, question: "What is 7 + 6?" }

];


// GET puzzles
router.get("/", (req, res) => {

  console.log("Puzzles requested");

  res.json(puzzles);

});


// Save progress
router.post("/progress", (req, res) => {

  console.log("Progress received:", req.body);

  res.json({
    success: true
  });

});


export default router;
