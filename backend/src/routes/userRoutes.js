import express from "express";
import { createUser, getAllUsers, deleteUser } from "../controllers/UserControllers.js";
import upload from "../config/multer.config.js";

const router = express.Router();

router
  .route("/users")
  .post(upload.single("img"), createUser)
  .get(getAllUsers);

router.delete("/users/:userId", deleteUser);
export default router;
