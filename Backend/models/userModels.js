import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});

const User= mongoose.model("User", UserSchema);

export default User;
