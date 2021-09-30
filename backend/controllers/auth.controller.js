import config from "../config/auth.config.js";
import db from "../models/index.js";
const User = db.users;
const Role = db.roles;

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Find out if username already exists
    const oldUser = await User.findOne({ username: username });
    if (oldUser) {
      return res.status(409).json("User already exists");
    } else {
      const newUser = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
      });

      // Create token for new user
      const token = jwt.sign(
        {
          user_id: newUser._id,
          username,
        },
        config.secret,
        {
          expiresIn: "2h",
        }
      );

      newUser.token = token;
      return res.status(200).json(newUser);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  // FInd account from database
  const account = await User.findOne({ username: username });
  // Check account found and verify password
  if (!account || !bcrypt.compareSync(password, account.password)) {
    return res.status(401).json({ error: "Invalid Credentials" });
  } else {
    // Create token
    try {
      const token = jwt.sign(
        {
          user_id: account._id,
          username,
        },
        config.secret,
        {
          expiresIn: "2h",
        }
      );

      account.token = token;
      return res
        .status(200)
        .json({ account, message: "successfully authenticated!" });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
};
