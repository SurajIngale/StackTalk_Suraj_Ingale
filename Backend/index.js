import express from "express";
import connectDb from "./db.js";
import userRoutes from "./routes/userRoutes.js"
import questionRoutes from "./routes/qnaRoutes.js"

const app = express();
const PORT = 3000;
app.use(express.json());

connectDb();

app.use("/user", userRoutes);
app.use("/queations", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });