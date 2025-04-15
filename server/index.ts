import express from "express";
import cors from "cors";
import stockRoutes from "./routes/stocks";
import weatherRoutes from "./routes/weather";
import backendRoutes from "./routes/backend";
import dotenv from "dotenv";
import {
  clerkMiddleware,
  clerkClient,
  requireAuth,
  getAuth,
} from "@clerk/express";

dotenv.config();

const app = express();
const PORT = 8000;

// Enable CORS for frontend requests
// Parse JSON bodies in requests
// Using clerkMiddleware to get the Auth object which has the userID and sessionID
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Simple test route
app.get("/", async (req, res) => {
  const { userId } = getAuth(req);
  console.log(userId);

  res.json({
    message: `Stock API Server is running, USER ID: ${userId}`,
  });
});

// route setup
app.use("/api/stocks", stockRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/backend", backendRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
