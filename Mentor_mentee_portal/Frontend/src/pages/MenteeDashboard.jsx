// Frontend/src/pages/MenteeDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import Chat from "../components/Chat.jsx";

export default function MenteeDashboard() {
  const [tasks, setTasks] = useState([]);
  const [mentor, setMentor] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [proofFiles, setProofFiles] = useState({}); // taskId -> File

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const nav = useNavigate();

  const logout = () => {
    localStorage.clear();
    nav("/login");
  };

  const loadData = async () => {
    const [taskRes, meRes] = await Promise.all([
      api.get("/tasks"),
      api.get("/auth/me"),
    ]);
    setTasks(taskRes.data);

    if (meRes.data.assignedMentor) {
      const { data: allMentors } = await api.get("/auth/mentors");
      const found = allMentors.find(
        (m) => m._id === meRes.data.assignedMentor
      );
      if (found) setMentor(found);
      else setMentor({ _id: meRes.data.assignedMentor, name: "Mentor" });
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

  const updateStatus = async (id, status) => {
    await api.put(`/tasks/${id}`, { status });
    loadData();
  };

  const statusColor = (status) => {
    if (status === "Completed") return "success";
    if (status === "In Progress") return "warning";
    return "default";
  };

  const handleProofChange = (taskId, file) => {
    setProofFiles((prev) => ({ ...prev, [taskId]: file || null }));
  };

  // NOTE: this just logs; to really upload you’d add an API endpoint + FormData
  const handleProofUpload = async (taskId) => {
    const file = proofFiles[taskId];
    if (!file) {
      alert("Please choose a file first.");
      return;
    }
    console.log("Selected proof file for task", taskId, file);
    alert("Proof selected. (Backend upload can be added later.)");
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Mentee Dashboard</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>{user?.name}</Typography>
          <Button variant="outlined" size="small" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* Summary cards */}
      <Box
        sx={{
          mb: 3,
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="subtitle2">Total Tasks</Typography>
            <Typography variant="h5">{stats.total}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle2">Pending</Typography>
            <Typography variant="h5" color="warning.main">
              {stats.pending}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle2">In Progress</Typography>
            <Typography variant="h5" color="info.main">
              {stats.inProgress}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="subtitle2">Completed</Typography>
            <Typography variant="h5" color="success.main">
              {stats.completed}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">My Tasks</Typography>
            <TextField
              select
              size="small"
              label="Filter by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: 170 }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
          </Box>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Upload Proof</TableCell>
                <TableCell>Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((t) => (
                <TableRow key={t._id}>
                  <TableCell>{t.title}</TableCell>
                  <TableCell>
                    <Chip label={t.status} color={statusColor(t.status)} />
                  </TableCell>
                  <TableCell>
                    {t.deadline ? t.deadline.slice(0, 10) : "-"}
                  </TableCell>
                  <TableCell>
                    <input
                      type="file"
                      onChange={(e) =>
                        handleProofChange(
                          t._id,
                          e.target.files?.[0] || null
                        )
                      }
                    />
                    <Button
                      size="small"
                      sx={{ mt: 1 }}
                      variant="outlined"
                      onClick={() => handleProofUpload(t._id)}
                    >
                      Upload
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => updateStatus(t._id, "Pending")}
                    >
                      Pending
                    </Button>
                    <Button
                      size="small"
                      onClick={() => updateStatus(t._id, "In Progress")}
                    >
                      In Progress
                    </Button>
                    <Button
                      size="small"
                      onClick={() => updateStatus(t._id, "Completed")}
                    >
                      Done
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {mentor && (
        <Card>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h6">My Mentor</Typography>
                <Typography>{mentor.name}</Typography>
                <Typography variant="body2">{mentor.email}</Typography>
              </Box>
              <Button variant="outlined" onClick={() => setChatOpen(true)}>
                Chat
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {chatOpen && mentor && (
        <Chat otherUser={mentor} onClose={() => setChatOpen(false)} />
      )}
    </Box>
  );
}
