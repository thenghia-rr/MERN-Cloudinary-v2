import UserModel from "../models/User.js";
import uploadToCloudinary from "../utils/cloudinary.js";

const createUser = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Avatar is required" });
    }

    const file = req.file || ""
    const img_url = await uploadToCloudinary(file);

    console.log(img_url);

    const newUser = new UserModel({
      name,
      avatar: img_url.secure_url,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({});
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(users);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export { createUser, getAllUsers };
