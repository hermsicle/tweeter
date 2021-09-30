import { mongoose, model } from "mongoose";
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  tweet: {
    type: String,
    required: true,
  },
});

const Tweet = model("Tweet", TweetSchema);

export default Tweet;
