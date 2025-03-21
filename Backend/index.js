import express from "express";
import connectDb from "./db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"
import questionRoutes from "./routes/qnaRoutes.js"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

connectDb();

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });