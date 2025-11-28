// Frontend/src/pages/MentorDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Chip,
  MenuItem,
  Badge,
  Divider,
} from "@mui/material";
import Chat from "../components/Chat.jsx";
import TaskBoard from "../components/TaskBoard.jsx";

export default function MentorDashboard() {
  const [tasks, setTasks] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    menteeId: "",
    priority: "Medium",
  });
  const [chatUser, setChatUser] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [menteeSearch, setMenteeSearch] = useState("");
  const [unreadByMentee, setUnreadByMentee] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const nav = useNavigate();

  const logout = () => {
    localStorage.clear();
    nav("/login");
  };

  const loadData = async () => {
    const [taskRes, menteeRes] = await Promise.all([
      api.get("/tasks"),
      api.get("/auth/my-mentees"),
    ]);
    setTasks(taskRes.data || []);
    setMentees(menteeRes.data || []);

    try {
      const { data } = await api.get("/chat/unread-summary");
      const map = {};
      (data || []).forEach((item) => {
        map[item.userId] = item.count;
      });
      setUnreadByMentee(map);
    } catch (err) {
      console.log("Unread summary error:", err.message);
    }
  };

  useEffect(() => {
    loadData().catch(console.error);
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === "Pending").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    return { total, pending, inProgress, completed };
  }, [tasks]);

  const filteredTasks =
    statusFilter === "All"
      ? tasks
      : tasks.filter((t) => t.status === statusFilter);

  const filteredMentees = useMemo(() => {
    const term = menteeSearch.trim().toLowerCase();
    if (!term) return mentees;
    return mentees.filter((m) => m.name.toLowerCase().includes(term));
  }, [mentees, menteeSearch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!form.menteeId) {
      alert("Please select a mentee.");
      return;
    }
    await api.post("/tasks", {
      title: form.title,
      description: form.description,
      deadline: form.deadline,
      menteeId: form.menteeId,
      priority: form.priority,
    });
    setForm({
      title: "",
      description: "",
      deadline: "",
      menteeId: "",
      priority: "Medium",
    });
    loadData();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/tasks/${id}`, { status });
    loadData();
  };

  const addFeedback = async (id) => {
    const feedback = prompt("Enter feedback for this task:");
    if (!feedback) return;
    await api.put(`/tasks/${id}`, { feedback });
    loadData();
  };

  const handleBoardStatusChange = (taskId, newStatus) => {
    updateStatus(taskId, newStatus);
  };

  const statusColor = (status) => {
    if (status === "Completed") return "success";
    if (status === "In Progress") return "warning";
    return "default";
  };

  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h4">Mentor Dashboard</Typography>
          <Typography variant="body2" color="text.secondary">
            Track mentees, assign tasks, and manage progress in one place.
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Welcome, {user?.name}</Typography>
          <Button variant="outlined" size="small" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Stats + quick info */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Tasks</Typography>
              <Typography variant="h5">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Pending</Typography>
              <Typography variant="h5" color="warning.main">
                {stats.pending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">In Progress</Typography>
              <Typography variant="h5" color="info.main">
                {stats.inProgress}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Completed</Typography>
              <Typography variant="h5" color="success.main">
                {stats.completed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Assign task + mentees list */}
      <Grid container spacing={3}>
        {/* Assign Task */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Assign New Task
              </Typography>
              <form onSubmit={createTask}>
                <TextField
                  label="Title"
                  name="title"
                  fullWidth
                  margin="normal"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="date"
                      label="Deadline"
                      name="deadline"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      value={form.deadline}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      label="Priority"
                      name="priority"
                      fullWidth
                      margin="normal"
                      value={form.priority}
                      onChange={handleChange}
                    >
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      fullWidth
                      label="Assign to mentee"
                      name="menteeId"
                      margin="normal"
                      value={form.menteeId}
                      onChange={handleChange}
                      required
                    >
                      {mentees.map((m) => (
                        <MenuItem key={m._id} value={m._id}>
                          {m.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  Create Task
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Mentees + chat */}
        <Grid item xs={12} md={5}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                My Mentees
              </Typography>
              <TextField
                fullWidth
                size="small"
                label="Search mentee"
                value={menteeSearch}
                onChange={(e) => setMenteeSearch(e.target.value)}
                sx={{ mb: 2 }}
              />
              {filteredMentees.map((m) => (
                <Box
                  key={m._id}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Box>
                    <Typography>{m.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {m.email}
                    </Typography>
                  </Box>
                  <Badge
                    color="error"
                    badgeContent={unreadByMentee[m._id] || 0}
                    invisible={!unreadByMentee[m._id]}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => setChatUser(m)}
                    >
                      Chat
                    </Button>
                  </Badge>
                </Box>
              ))}
              {filteredMentees.length === 0 && (
                <Typography variant="body2">No mentees found.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Board + table view */}
      <Box mt={4}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Task Board</Typography>
              <TextField
                select
                label="Filter view"
                size="small"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ minWidth: 170 }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Pending">Pending only</MenuItem>
                <MenuItem value="In Progress">In Progress only</MenuItem>
                <MenuItem value="Completed">Completed only</MenuItem>
              </TextField>
            </Box>

            <TaskBoard
              tasks={filteredTasks}
              onStatusChange={handleBoardStatusChange}
              onCardClick={(t) => setSelectedTask(t)}
            />

            {selectedTask && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography variant="subtitle1">
                    Selected task: {selectedTask.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {selectedTask.description || "No description."}
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    <Chip
                      label={selectedTask.status}
                      color={statusColor(selectedTask.status)}
                      size="small"
                    />
                    <Chip
                      label={`Priority: ${selectedTask.priority || "Low"}`}
                      size="small"
                    />
                    {selectedTask.deadline && (
                      <Chip
                        label={`Deadline: ${selectedTask.deadline.slice(
                          0,
                          10
                        )}`}
                        size="small"
                      />
                    )}
                    <Button
                      size="small"
                      onClick={() => addFeedback(selectedTask._id)}
                    >
                      Add / Edit feedback
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </CardContent>
        </Card>
      </Box>

      {chatUser && (
        <Chat otherUser={chatUser} onClose={() => setChatUser(null)} />
      )}
    </Box>
  );
}
