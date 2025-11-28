import express from "express";
import { register, login, getMentors, getMe, getMyMentees } from "../controllers/authController.js";
import { protect, mentorOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/mentors", getMentors);
router.get("/me", protect, getMe);
router.get("/my-mentees", protect, mentorOnly, getMyMentees);

export default router;
