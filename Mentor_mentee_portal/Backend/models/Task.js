// Backend/models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },

    deadline: { type: Date },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    // NEW: priority so UI can show Low / Medium / High
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mentee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    feedback: { type: String, default: "" },

    // OPTIONAL: proof of completion (link to file / screenshot)
    proofUrl: { type: String, default: "" },

    // OPTIONAL: mentor review of the proof
    proofStatus: {
      type: String,
      enum: ["Not Submitted", "Under Review", "Approved", "Rejected"],
      default: "Not Submitted",
    },
    proofComment: { type: String, default: "" },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
