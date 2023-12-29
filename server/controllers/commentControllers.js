import Comment from "../models/commentModel.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";

export const createComment = async (req, res) => {
  try {
    const { author_email, content, post_id } = req.body;
    if (!author_email || !content || !post_id) {
      // some error
      res
        .status(400)
        .send("author_email, content, post_id kindly fill all the fields");
    }
    // find if the author_is is valid or not
    const user = await User.findOne({ email: author_email });
    if (!user) {
      res.status(400).send("Given user_email is incorrect");
    }
    // find if post_id is valid or not
    const post = await Post.findOne({ _id: post_id });
    if (!post) {
      res.status(400).send("Given post_id is incorrect");
    }
    // comment creation
    const comment = await Comment.create({
      author: user._id,
      content,
      post: post_id,
    });
    const fullComment = await Comment.findOne({ _id: comment._id })
      .populate("author")
      .populate("post");

    // update the post comments array
    await Post.findOneAndUpdate(
      { _id: post_id },
      { comments: [...post.comments, comment._id] }
    );

    res.status(201).json(fullComment);
  } catch (error) {
    res.status(400).send(error);
  }
};
