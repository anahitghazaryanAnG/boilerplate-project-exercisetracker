import { Exercise } from "../models/exercise.js";
import { User } from "../models/user.js";

export const addExercise = async (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;

  if (!description || !duration) {
    return res
      .status(400)
      .json({ error: "Description and duration are required" });
  }

  try {
    const user = await User.getById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const exercise = await Exercise.create(_id, description, duration, date);

    res.json({
      userId: _id,
      exerciseId: exercise.id,
      username: user.username,
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(date).toDateString(exercise.date),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to add exercise" });
  }
};

export const getExerciseLog = async (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;

  try {
    const user = await User.getById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const logs = await Exercise.getByUserId(_id, from, to, limit);
    res.json({
      username: user.username,
      count: logs.length,
      userId: user.id,
      logs,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve logs" });
  }
};
