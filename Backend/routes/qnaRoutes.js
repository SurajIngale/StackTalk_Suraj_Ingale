import express from "express";
import Question from "../models/questionModel.js";
import User from "../models/userModels.js"

const router = express.Router();

// Ask a Question
router.post("/", async (req, res) => {
  try {
    const { username, title, body } = req.body;

    // Create new question
    const question = new Question({ username, title, body });
    await question.save();

    // Link question to user
    await User.findOneAndUpdate(
      { username },
      { $push: { questions: question._id } }
    );

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Questions
router.get("/", async (req, res) => {
  const questions = await Question.find();
  res.status(200).json(questions);
});

// Get a Question by ID
router.get("/:id", async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ message: "Question not found" });
  res.status(200).json(question);
});

// Answer a Question
router.post("/:id/answers", async (req, res) => {
  try {
    const { username, answer } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) return res.status(404).json({ message: "Question not found" });

    question.answers.push({ username, answer });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
