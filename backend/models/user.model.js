import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  token: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
