import React, { useState, useEffect } from "react";
import api from "../api";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Card,
} from "@mui/material";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("mentor");
  const [mentorId, setMentorId] = useState("");
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const loadMentors = async () => {
      try {
        const { data } = await api.get("/auth/mentors");
        setMentors(data);
      } catch (err) {
        console.log("LOAD MENTORS ERROR:", err.response?.data);
      }
    };
    loadMentors();
  }, []);

  useEffect(() => {
    const loadMentors = async () => {
      try {
        const res = await api.get("/auth/mentors");
        setMentors(res.data);
      } catch (err) {
        console.error("Mentor load failed:", err.response?.data);
      }
    };
    loadMentors();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      name,
      email,
      password,
      role,
      mentor: role === "mentee" ? mentorId : null
    };
  
    try {
      const res = await api.post("/auth/register", payload);
      alert("Registration Successful!");
      console.log("Registered:", res.data);
  
    } catch (err) {
      console.error("REGISTER ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Registration failed");
    }
  };
  

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={8}
      width="100%"
    >
      <Card sx={{ width: "400px", padding: "20px" }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name *"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            fullWidth
            label="Email *"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            select
            label="Role *"
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="mentor">Mentor</MenuItem>
            <MenuItem value="mentee">Mentee</MenuItem>
          </TextField>

          {role === "mentee" && (
            <TextField
              fullWidth
              select
              label="Select Mentor"
              margin="normal"
              value={mentorId}
              onChange={(e) => setMentorId(e.target.value)}
            >
              {mentors.length > 0 ? (
                mentors.map((m) => (
                  <MenuItem key={m._id} value={m._id}>
                    {m.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No mentors available</MenuItem>
              )}
            </TextField>
          )}

          <TextField
            fullWidth
            type="password"
            label="Password *"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            REGISTER
          </Button>
        </form>

        <Typography textAlign="center" mt={2}>
          Already have an account?{" "}
          <a href="/login" style={{ textDecoration: "none" }}>Login</a>
        </Typography>
      </Card>
    </Box>
  );
}
