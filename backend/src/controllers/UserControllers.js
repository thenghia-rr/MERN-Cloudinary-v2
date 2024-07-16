import UserModel from "../models/User.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary.js";

// [POST] /api/users
const createUser = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Avatar is required" });
    }

    const file = req.file || "";
    const img_url = await uploadToCloudinary(file);

    console.log(img_url);

    const newUser = new UserModel({
      name,
      avatar: img_url.secure_url,
      avatarId: img_url.public_id,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// [GET] /api/users
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

// [DELETE] /api/users/:userId
const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await deleteFromCloudinary(user.avatarId);
    await UserModel.deleteOne({_id: userId})

    return res.json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export { createUser, getAllUsers, deleteUser };
