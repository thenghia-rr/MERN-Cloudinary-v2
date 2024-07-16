
//  Lưu ý: Do Cloudinary SDK tự động lấy API Key từ environment, nên ở bước này, 
// cần import uploadToCloudinary sau câu lệnh dotenv.config(), nếu không sẽ báo lỗi thiếu API Key
import dotenv from "dotenv";
dotenv.config();
import {uploadToCloudinary} from "../utils/cloudinary.js";

const uploadImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No img uploaded" });
  }

  try {
    const result = await uploadToCloudinary(req.file);

    return res.status(201).json({
      url: result.url,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export { uploadImage };
