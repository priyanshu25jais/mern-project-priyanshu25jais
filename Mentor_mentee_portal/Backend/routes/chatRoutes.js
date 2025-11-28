import express from "express";
import Message from "../models/Message.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Send message
router.post("/", protect, async (req, res) => {
  const { receiverId, text } = req.body;
  if (!receiverId || !text)
    return res.status(400).json({ message: "Missing fields" });

  const msg = await Message.create({
    sender: req.user._id,
    receiver: receiverId,
    text,
  });

  res.status(201).json(msg);
});

// Get conversation
router.get("/:otherUserId", protect, async (req, res) => {
  const { otherUserId } = req.params;

  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: otherUserId },
      { sender: otherUserId, receiver: req.user._id },
    ],
  })
    .sort({ createdAt: 1 })
    .populate("sender", "name")
    .populate("receiver", "name");

  res.json(messages);
});

// Unread summary per user (for current logged‑in user)
router.get("/summary/unread", protect, async (req, res) => {
  try {
    const pipeline = [
      { $match: { receiver: req.user._id } },
      {
        $group: {
          _id: "$sender",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          userId: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ];

    const result = await Message.aggregate(pipeline);
    res.json(result);
  } catch (err) {
    console.error("Unread summary error:", err);
    res.status(500).json({ message: "Could not load unread messages" });
  }
});

export default router;
