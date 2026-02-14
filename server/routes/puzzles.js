import express from "express";

const router = express.Router();

const puzzles = [

  { id: 1, question: "What is 2 + 2?" },

  { id: 2, question: "What is 5 × 3?" },

  { id: 3, question: "What is 10 − 4?" },

  { id: 4, question: "What is 9 ÷ 3?" },

  { id: 5, question: "What is 7 + 6?" }

];


// ✅ GET all puzzles
router.get("/", (req, res) => {

  res.json(puzzles);

});


// ✅ Save progress
router.post("/progress", (req, res) => {

  console.log("Received progress:", req.body.progress);

  res.json({

    success: true

  });

});


// ✅ REQUIRED FOR ES MODULES
export default router;
