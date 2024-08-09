import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
});

// const comment = mongoose.model("Comment", commentSchema);
const comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default comment;
