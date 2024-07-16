import express from "express";
import upload from "../config/multer.config.js";
import { uploadImage } from "../controllers/UploadController.js";
const router = express.Router();

// [POST] api/cloudinary-upload
// router.post("/upload", upload.single("img"), async (req, res, next) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }

//   return res.json({
//     filename: req.file.originalname,
//     fileSize: req.file.size,
//     mimetype: req.file.mimetype,
//   });
// });

router.post("/upload", upload.single("img"), uploadImage );

export default router;
