import express from "express";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore";
import { requireAuth, getAuth } from "@clerk/express";

const router = express.Router();

router.use(express.json());

router.post("/validate-and-save", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const { ticker } = req.body;
  console.log("req.body:", req.body);
  console.log("ticker: ", ticker);
  // console.log("USER ID IS VALID: ", userId);

  // TODO: api call to finnhubb and data validation -> write to db

  try {
    const finnhubResponse = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.FINNHUB_API_KEY}`
    );
    if (!finnhubResponse.ok) {
      throw new Error(`API responded with status: ${finnhubResponse.status}`);
    }

    const finnhubData = await finnhubResponse.json();
    console.log(finnhubData);
  } catch (err) {
    console.error("An error occurred with the finnhub API req: ", err);
  }

  if (!userId || !ticker) {
    res.status(400).json({ error: "userId and tickers are required" });
    return;
  }

  const userRef = doc(db, "users", userId);
  try {
    // First check if the user document exists
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // If the document exists, update it
      await updateDoc(userRef, {
        tickers: arrayUnion(ticker),
      });
    } else {
      // If the document doesn't exist, create it
      await setDoc(userRef, {
        tickers: [ticker],
      });
    }

    res.status(200).json({ message: "Data saved successfully!" });
  } catch (err) {
    console.error("SERVER ERROR OCCURRED: ", err);
    res.status(500).json({ error: "Failed to save data" });
  }
});

export default router;
