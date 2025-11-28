// Frontend/src/components/TaskBoard.jsx
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Tooltip,
} from "@mui/material";

const statusColumns = [
  { key: "Pending", label: "Pending" },
  { key: "In Progress", label: "In Progress" },
  { key: "Completed", label: "Completed" },
];

const priorityColor = (p) => {
  if (p === "High") return "error";
  if (p === "Medium") return "warning";
  return "success";
};

export default function TaskBoard({ tasks, onStatusChange, onCardClick }) {
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) return;
    onStatusChange(taskId, newStatus);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        gap: 2,
      }}
    >
      {statusColumns.map((col) => (
        <Box
          key={col.key}
          onDrop={(e) => handleDrop(e, col.key)}
          onDragOver={handleDragOver}
          sx={{
            bgcolor: "grey.50",
            borderRadius: 2,
            minHeight: 260,
            p: 1.5,
            border: "1px dashed",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="subtitle1">{col.label}</Typography>
            <Chip
              size="small"
              label={
                tasks.filter((t) => t.status === col.key).length || "0"
              }
            />
          </Box>

          {tasks
            .filter((t) => t.status === col.key)
            .map((t) => (
              <Card
                key={t._id}
                draggable
                onDragStart={(e) => handleDragStart(e, t._id)}
                onClick={() => onCardClick && onCardClick(t)}
                sx={{
                  mb: 1.5,
                  cursor: "grab",
                  "&:active": { cursor: "grabbing" },
                  boxShadow: 1,
                  "&:hover": { boxShadow: 3, transform: "translateY(-2px)" },
                  transition: "all 0.2s",
                }}
              >
                <CardContent sx={{ py: 1.5 }}>
                  <Typography variant="subtitle2" noWrap gutterBottom>
                    {t.title}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 0.5,
                    }}
                  >
                    <Chip
                      size="small"
                      color={priorityColor(t.priority || "Low")}
                      label={t.priority || "Low"}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {t.deadline ? t.deadline.slice(0, 10) : "No deadline"}
                    </Typography>
                  </Box>

                  {t.mentee?.name && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      👤 {t.mentee.name}
                    </Typography>
                  )}
                  {t.mentor?.name && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      👤 {t.mentor.name}
                    </Typography>
                  )}

                  {t.feedback && (
                    <Tooltip title={t.feedback}>
                      <Typography
                        variant="caption"
                        color="primary"
                        sx={{ mt: 0.5, display: "block" }}
                        noWrap
                      >
                        💬 Feedback added
                      </Typography>
                    </Tooltip>
                  )}
                </CardContent>
              </Card>
            ))}

          {tasks.filter((t) => t.status === col.key).length === 0 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block", textAlign: "center" }}
            >
              Drop tasks here
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}
