import React, { useEffect, useMemo, useRef, useState } from "react";
import api from "../api";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Chat({ otherUser, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const endRef = useRef(null);

  const currentUser = useMemo(
    () => JSON.parse(localStorage.getItem("user") || "null"),
    []
  );

  const scrollToBottom = () => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const loadMessages = async () => {
    try {
      const { data } = await api.get(`/chat/${otherUser._id}`);
      setMessages(data);
      setTimeout(scrollToBottom, 0);
    } catch (err) {
      console.log("Chat Fetch Error:", err.message);
    }
  };

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherUser._id]);

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      await api.post("/chat", { receiverId: otherUser._id, text });
      setText("");
      loadMessages(); // Refresh chat
    } catch (err) {
      console.log("Chat Send Error:", err.message);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        width: 380,
        maxHeight: 520,
        zIndex: 1300,
      }}
    >
      <Card sx={{ boxShadow: 8, borderRadius: 3, overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1.5,
            py: 1,
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              {otherUser.name?.charAt(0) || "M"}
            </Avatar>
            <Box>
              <Typography variant="subtitle2">
                Chat with {otherUser.name}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Typically replies within a few minutes
              </Typography>
            </Box>
          </Box>

          <IconButton size="small" onClick={onClose} sx={{ color: "inherit" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <CardContent sx={{ p: 1.5, pt: 1, display: "flex", flexDirection: "column", height: 380 }}>
          {/* Chat Box */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mt: 1,
              px: 1,
              py: 0.5,
              bgcolor: "#fafafa",
              borderRadius: 1,
            }}
          >
            {messages.length === 0 && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", textAlign: "center", mt: 4 }}
              >
                Start the conversation by sending a message.
              </Typography>
            )}

            {messages.map((m, i) => {
              const isMe = m.sender?._id === currentUser?.id;
              const time = m.createdAt
                ? new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";
              return (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    justifyContent: isMe ? "flex-end" : "flex-start",
                    mb: 0.75,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "80%",
                      px: 1,
                      py: 0.75,
                      borderRadius: 2,
                      bgcolor: isMe ? "primary.main" : "grey.200",
                      color: isMe ? "primary.contrastText" : "text.primary",
                    }}
                  >
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      {isMe ? "You" : m.sender?.name}
                    </Typography>
                    <Typography variant="body2">{m.text}</Typography>
                    {time && (
                      <Typography
                        variant="caption"
                        sx={{ display: "block", textAlign: "right", opacity: 0.7 }}
                      >
                        {time}
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
            <div ref={endRef} />
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Input */}
          <Box
            component="form"
            onSubmit={send}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <TextField
              size="small"
              fullWidth
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" variant="contained">
              Send
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
