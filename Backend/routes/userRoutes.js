import express from "express";
import User from "../models/userModels.js";


const router = express.Router();

// Create or Fetch User
router.post("/", async (req, res) => {
  try {
    const { username } = req.body;
    let user = await User.findOne({ username });

    if (!user) {
      user = new User({ username });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Questions Asked by a User
router.get("/:username/questions", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate("questions");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
