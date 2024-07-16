import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import route from "./src/routes/index.js";

dotenv.config();
const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Appy routes
route(app);

app.get("/", (req, res) => {
  return res.send("Welcome to MERN Cloundinary server");
});

// DB and server
connectDB();
app.listen(3000, () => {
  console.log("App listening on port 3000");
});
