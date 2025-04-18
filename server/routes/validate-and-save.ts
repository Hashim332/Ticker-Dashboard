import express from "express";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore";
import { requireAuth, getAuth } from "@clerk/express";

const router = express.Router();

router.use(express.json());

interface ValidData {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

function isValid(apiResponse: ValidData) {
  return (
    typeof apiResponse.c === "number" &&
    typeof apiResponse.d === "number" &&
    typeof apiResponse.dp === "number" &&
    typeof apiResponse.h === "number" &&
    typeof apiResponse.l === "number" &&
    typeof apiResponse.o === "number" &&
    typeof apiResponse.pc === "number" &&
    typeof apiResponse.t === "number"
  );
}

router.post("/validate-and-save", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const { ticker } = req.body;

  if (!userId || !ticker) {
    res.status(400).json({ error: "userId and tickers are required" });
    return;
  }

  // TODO: api call to finnhubb and data validation -> write to db ✅✅✅

  try {
    const finnhubResponse = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.FINNHUB_API_KEY}`
    );

    if (!finnhubResponse.ok) {
      throw new Error(`API responded with status: ${finnhubResponse.status}`);
    }

    const finnhubData = await finnhubResponse.json();

    if (isValid(finnhubData)) {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      // DB document existence check
      if (userSnap.exists()) {
        await updateDoc(userRef, {
          tickers: arrayUnion(ticker),
        });
      } else {
        await setDoc(userRef, {
          tickers: [ticker],
        });
      }
      res.json(finnhubData);
      res.status(200).json({ message: "Data saved successfully!" });
    } else {
      console.log("data invalid");
      res.status(500).json({ error: "Failed to save data, ticker invalid" });
    }
  } catch (err) {
    console.error("An error occurred with the finnhub API req: ", err);
  }
});

export default router;
