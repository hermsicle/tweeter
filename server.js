// Setup express web server
import express from "express";
import cors from "cors";
const app = express();

let corsOptions = {
  origin: "http://localhost:8081",
};

// Allows us to make cross origin requests
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB database
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/my_db";
const mongoOptions = {};
import db from "./backend/models/index.js";
// console.log(db);
const Role = db.roles;

db.mongoose
  .connect(MONGO_URI, mongoOptions)
  .then(() => {
    console.log("successfully connected to MongoDb!");
  })
  .catch((err) => console.log("connection error", err));

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Auth!!! Lets get it " });
});

// routes for auth and user
import authRoutes from "./backend/routes/auth.routes.js";
app.use("/api", authRoutes);

import userRoutes from "./backend/routes/user.routes.js";
app.use("/api", userRoutes);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}`);
});
