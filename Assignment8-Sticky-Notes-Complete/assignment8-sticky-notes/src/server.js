require("dotenv").config();

const express = require("express");
const connectDB = require("./common/db/connection");

const authRouter = require("./app/auth/auth.router");
const userRouter = require("./app/user/user.router");
const noteRouter = require("./app/note/note.router");

const app = express();

app.use(express.json());

app.use("/users", authRouter);
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.get("/", (req, res) => {
  res.json({ message: "Sticky Notes API is running" });
});

app.use((error, req, res, next) => {
  console.log(error);

  if (error.code === 11000) {
    return res.status(409).json({ message: "Email already exists" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }

  if (error.name === "CastError" || error.name === "BSONError") {
    return res.status(400).json({ message: "Invalid ID" });
  }

  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
