import express from "express";
import stockData from "../data/stocks.json";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore/lite";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(stockData);
});

// add error handling eventually
// router.get("/test", async (_req, res) => {
//   const usersCol = collection(db, "Users");
//   const userSnapshot = await getDocs(usersCol);
//   const userList = userSnapshot.docs.map((doc) => doc.data());
//   res.json(userList);
//   return;
// });

export default router;
