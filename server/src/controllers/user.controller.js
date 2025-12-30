import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit);
  res.json(users);
};

export const activateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "active" });
  res.json({ message: "User activated" });
};

export const deactivateUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { status: "inactive" });
  res.json({ message: "User deactivated" });
};

export const updateProfile = async (req, res) => {
  const { fullName, email } = req.body;
  await User.findByIdAndUpdate(req.user._id, { fullName, email });
  res.json({ message: "Profile updated" });
};

export const changePassword = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  await User.findByIdAndUpdate(req.user._id, { password: hashed });
  res.json({ message: "Password changed" });
};
