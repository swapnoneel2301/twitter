import User from "../models/userModel.js";
export const createUser = async (req, res) => {
  const { name, email } = req.body;
  if (!email || !name) {
    res.status(400).send("Fill name , email all the fields");
  }
  const user = await User.create({ name, email });
  if (user) {
    const { _id, name, email } = user;
    res.status(201).json({
      _id,
      name,
      email,
    });
  } else {
    res.status(400).send("Not able to create user");
  }
};
