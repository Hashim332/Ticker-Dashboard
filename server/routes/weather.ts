import express from "express";
import fetch from "node-fetch";
import { WeatherApiResponse } from "../backend-utils";
import "dotenv/config";

const router = express.Router();
const API_KEY = process.env.OPENWEATHER_API_KEY;

router.get("/", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      res.status(400).json({ error: "Latitude and longitude are required" });
      return;
    }
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = (await response.json()) as WeatherApiResponse;
    res.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch weather data", additionalInfo: error });
  }
});

export default router;
