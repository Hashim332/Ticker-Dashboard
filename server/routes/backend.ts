import express from "express";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore/lite";
import {
  clerkMiddleware,
  //   clerkMiddleware,
  //   clerkClient,
  //   requireAuth,
  getAuth,
} from "@clerk/express";

const router = express.Router();
router.use(clerkMiddleware());

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

router.get("/test", async (req, res) => {
  const { userId } = getAuth(req);
  console.log(userId);

  res.json({
    message: `Stock API Server is running, USER ID: ${userId}`,
  });
});

export default router;
