import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";

// function to verify if token is valid or not
const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  // if token does not exist:
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    // Check if the token matches the token in the config.secret
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
  } catch (err) {
    res.status(401).send("Invalid Token");
  }

  return next();
};

export default verifyToken;
