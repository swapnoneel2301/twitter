import Post from "../models/postModel.js";
import User from "../models/userModel.js";

export const allPosts = async (req, res) => {
  try {
    const { post_id, search } = req.query;
    console.log(post_id);
    if (post_id) {
      const post = await Post.findOne({ _id: post_id })
        .populate("author")
        .populate("comments");
      res.status(201).json(post);
    }
    const filter = search ? { content: { $regex: search } } : {};
    const posts = await Post.find(filter)
      .populate("author")
      .populate("comments");
    res.status(201).json(posts);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const createPost = async (req, res) => {
  try {
    const { author_email, content } = req.body;
    if (!content || !author_email) {
      res.status(400).send("Please fill the content, author_email field");
    }
    const user = User.findOne({ email: author_email });
    if (!user) {
      res.status(400).send("author_email is incorrect");
    }
    const post = await Post.create({
      author: user._id,
      content,
    });
    const fullPost = await Post.findOne({ _id: post._id }).populate("author");
    res.status(201).json(fullPost);
  } catch (error) {
    res.status(400).send(error);
  }
};
