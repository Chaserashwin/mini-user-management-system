import express from "express";
import {
  getUsers,
  activateUser,
  deactivateUser,
  updateProfile,
  changePassword,
} from "../controllers/user.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getUsers);
router.patch("/:id/activate", protect, adminOnly, activateUser);
router.patch("/:id/deactivate", protect, adminOnly, deactivateUser);

router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

export default router;
