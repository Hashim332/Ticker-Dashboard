import express from "express";
import { db } from "../firebase";
import { requireAuth, getAuth } from "@clerk/express";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const router = express.Router();

router.use(express.json());

router.delete("/delete-stock/:ticker", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const { ticker } = req.params;

  if (!userId) {
    res.status(400).json({ error: "Invalid user id" });
    return;
  }

  try {
    const userRef = doc(db, "users", `${userId}`);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const userData = docSnap.data();

    if (!userData.tickers || !Array.isArray(userData.tickers)) {
      res.status(400).json({ error: "User has no tickers or invalid format" });
      return;
    }

    const updatedUserData = userData.tickers.filter(
      (placeholder: string) => placeholder !== ticker
    );

    await updateDoc(userRef, {
      tickers: updatedUserData,
    });

    res.status(200).json(updatedUserData);
    return;
  } catch (err) {
    console.error("error: ", err);
  }
});

export default router;
