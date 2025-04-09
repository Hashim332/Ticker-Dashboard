import express from "express";
import stockData from "../data/stocks.json";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(stockData);
});

export default router;
