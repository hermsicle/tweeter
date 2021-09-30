// import verifySignUp from "../middleware/index.js";
import { signIn, signUp } from "../controllers/auth.controller.js";
import express from "express";
const router = express.Router();
import db from "../models/index.js";
import verifyToken from "../middleware/authJwt.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/auth/signup", signUp);

router.post("/auth/login", signIn);

router.post("/auth/welcome", verifyToken, (req, res) => {
  res.status(200).json({ message: "Welcome to home page!" });
});

// Delete all users
router.delete("/auth/users", (req, res) => {
  db.users.deleteMany().then(() => {
    res.send("successfully deleted all user");
  });
});

export default router;

// router.post(
//   "/auth/signup",
//   [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
//   signUp
// );
// router.post("/auth/signin", signIn);

// export default function (app) {
//   app.use(function (req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.post(
//     "/api/auth/signup",
//     [
//       verifySignUp.checkDuplicateUsernameOrEmail,
//       verifySignUp.checkRolesExisted,
//     ],
//     signUp
//   );

//   app.post("/api/auth/signin", signIn);
// }
