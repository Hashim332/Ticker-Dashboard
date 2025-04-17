import express from "express";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { clerkClient, requireAuth, getAuth } from "@clerk/express";

const router = express.Router();

router.use(express.json());

// router.get("/test", async (_req, res) => {
//   //   const usersCol = collection(db, "Users");
//   //   const userSnapshot = await getDocs(usersCol);
//   //   const userList = userSnapshot.docs.map((doc) => doc.data());
//   //   res.json(userList);

//   const { userId } = getAuth(_req);
//   console.log(userId);

//   res.json({
//     message: `Stock API Server is running, USER ID: ${userId}`,
//   });
// });

// router.get("/test", async (req, res) => {
//   const { userId } = getAuth(req);
//   console.log(userId);

//   res.json({
//     message: ` USER ID: ${userId}`,
//   });
// });

router.post("/post", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const { tickers } = req.body;
  console.log("USER ID IS VALID: ", userId);

  if (!userId || !tickers) {
    res.status(400).json({ error: "userId and tickers are required" });
    return;
  }

  try {
    await setDoc(doc(db, "users", userId), {
      tickers: tickers,
    });

    res.status(200).json({ message: "Data saved successfully!" });
  } catch (err) {
    console.error("SERVER ERROR OCCURRED: ", err);
    res.status(500).json({ error: "Failed to save data" });
  }
});

export default router;
