import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true, trim: true },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
