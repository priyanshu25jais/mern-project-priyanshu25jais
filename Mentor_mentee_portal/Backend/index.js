import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();
const app = express();

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Mentor–Mentee API running" });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/chat", chatRoutes);
// ERROR HANDLER MIDDLEWARE
app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR:", err.message);
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal server error",
    });
  });
  
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
