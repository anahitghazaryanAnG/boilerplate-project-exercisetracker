import { User } from "../models/user.js";

export const createUser = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const user = await User.create(username);
    res.json({ username: user.username, _id: user.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};
