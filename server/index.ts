import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Enable CORS for frontend requests
app.use(cors());

// Parse JSON bodies in requests
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Stock API Server is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
