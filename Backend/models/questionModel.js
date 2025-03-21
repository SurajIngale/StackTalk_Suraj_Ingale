import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  answers: [
    { username: String, answer: String, createdAt: { type: Date, default: Date.now } }
  ],
  createdAt: { type: Date, default: Date.now }
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;