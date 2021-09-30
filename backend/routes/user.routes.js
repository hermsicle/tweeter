import verifyToken from "../middleware/authJwt.js";
import express from "express";
const router = express.Router();
import db from "../models/index.js";

// Get all users registered
router.get("/users", (req, res) => {
  db.users
    .find()
    .then((allUsers) => {
      res.json(allUsers);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/welcome", verifyToken, (req, res) => {
  res.send({ message: "Welcome!" });
});

router.get("/test/all", (req, res) => {
  res.send("all access");
});

router.get("/test/user", (req, res) => {
  res.send("user access");
});

router.get("/test/mod", (req, res) => res.send("moderato access"));

router.get("/test/admin", (req, res) => {
  res.send("admin access");
});

export default router;
