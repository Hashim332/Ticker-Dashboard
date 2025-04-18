import express from "express";
import { db } from "../firebase";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { requireAuth, getAuth } from "@clerk/express";

const router = express.Router();

router.use(express.json());

router.post("/post", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const { tickers } = req.body;
  console.log("USER ID IS VALID: ", userId);

  if (!userId || !tickers) {
    res.status(400).json({ error: "userId and tickers are required" });
    return;
  }

  const userRef = doc(db, "users", userId);
  try {
    await setDoc(userRef, { tickers: arrayUnion(...tickers) }, { merge: true });

    res.status(200).json({ message: "Data saved successfully!" });
  } catch (err) {
    console.error("SERVER ERROR OCCURRED: ", err);
    res.status(500).json({ error: "Failed to save data" });
  }
});

export default router;
