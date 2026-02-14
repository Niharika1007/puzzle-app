import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";

// Import routes
import puzzleRoutes from "./routes/puzzles.js";

dotenv.config();

const { Pool } = pkg;
const app = express();

// ✅ CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local frontend
      "https://puzzle-app-liard.vercel.app", // Vercel frontend
    ],
    credentials: true,
  })
);

app.use(express.json());

// ✅ PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Export pool for use in routes if needed
export { pool };

// ✅ Puzzle routes
app.use("/puzzles", puzzleRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Server running");
});

// ✅ Save or update user
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
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
