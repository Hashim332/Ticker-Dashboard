import express from "express";
import cors from "cors";
import stockRoutes from "./routes/stocks";
import weatherRoutes from "./routes/weather";

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

app.use("/api/stocks", stockRoutes);
app.use("/api/weather", weatherRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
