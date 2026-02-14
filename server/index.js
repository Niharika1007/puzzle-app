import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";

// ✅ Import routes using ES Module syntax
import puzzleRoutes from "./routes/puzzles.js";

dotenv.config();

const { Pool } = pkg;

const app = express();


// ✅ Configure CORS ONLY ONCE (correct way)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://puzzle-app-liard.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());


// ✅ PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  // Required for Render / Railway / Supabase / Neon
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});


// ✅ Make pool available globally (optional best practice)
export { pool };


// ✅ Puzzle routes
app.use("/puzzles", puzzleRoutes);


// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Server running");
});


// ✅ User save route
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO users (name, email)
      VALUES ($1, $2)
      ON CONFLICT (email)
      DO UPDATE SET name = EXCLUDED.name
      RETURNING *;
      `,
      [name, email]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {

    console.error("DB ERROR:", err.message);

    res.status(500).json({
      error: err.message,
    });

  }
});


// ✅ Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
