import express from "express";
import { requireAuth, getAuth } from "@clerk/express";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { DocumentData } from "firebase/firestore";

const router = express.Router();

router.use(express.json());

async function getLiveStockData(userData: DocumentData) {
  try {
    const stockDataPromises = userData.tickers.map(async (ticker: string) => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.FINNHUB_API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        return { ticker, ...data };
      } catch (error) {
        console.error(`Error fetching data for ${ticker}:`, error);
        return null; // Returning null for failed API calls, can filter later
      }
    });

    const stockData = await Promise.all(stockDataPromises);
    console.log(
      "this should theortically be stock data ->",
      stockData.filter((data) => data !== null)
    );
    return stockData.filter((data) => data !== null); // Filter out any nulls from failed API calls
  } catch (error) {
    console.error("Error in getLiveStockData:", error);
    throw error; // Re-throw to be caught by the route handler
  }
}

router.get("/user-stocks", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(400).json({ error: "Invalid user id" });
    return;
  }

  try {
    const docRef = doc(db, "users", `${userId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      const userStockData = await getLiveStockData(userData);
      // res.status(200).json(userData);
      res.status(200).json(userStockData);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    // res.status(200).json(docSnap.data());
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
