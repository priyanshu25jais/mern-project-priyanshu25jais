import express from "express";
import Task from "../models/Task.js";
import { protect, mentorOnly } from "../middleware/auth.js";

const router = express.Router();

// Get tasks for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "mentee") {
      filter.mentee = req.user._id;
    } else if (req.user.role === "mentor") {
      filter.mentor = req.user._id;
    }

    const tasks = await Task.find(filter).populate("mentor mentee", "name email");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to load tasks", error: err.message });
  }
});

// Create Task (mentor only)
router.post("/", protect, mentorOnly, async (req, res) => {
  try {
    const { title, description, deadline, priority, mentee } = req.body;

    const newTask = await Task.create({
      title,
      description,
      deadline,
      priority,
      mentee,
      mentor: req.user._id,
    });

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task", error: err.message });
  }
});

// Update Task (status / proof / feedback)
router.put("/:id", protect, async (req, res) => {
  try {
    const allowedFields = [
      "status",
      "priority",
      "feedback",
      "proofUrl",
      "proofStatus",
      "proofComment",
    ];

    const updates = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) updates[key] = req.body[key];
    });

    const updated = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task", error: err.message });
  }
});

export default router;
