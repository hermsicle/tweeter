import mongoose from "mongoose";

const db = {};

db.mongoose = mongoose;

import roles from "./role.model.js";
import users from "./user.model.js";

// mongoose is an {} by default
db.roles = roles;
db.users = users;

db.ROLES = ["user", "admin", "moderator"];

// We added roles, users and an array called ROLES in our mongoose {}
// And we are exporting it as db

export default db;
