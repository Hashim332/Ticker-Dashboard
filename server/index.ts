import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather";
import validateAndSaveRoutes from "./routes/validate-and-save";
import userStocksRoutes from "./routes/user-stocks";
import dotenv from "dotenv";
import { clerkMiddleware, getAuth } from "@clerk/express";

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
app.use("/api/weather", weatherRoutes);
app.use("/api/", validateAndSaveRoutes);
app.use("/api", userStocksRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
