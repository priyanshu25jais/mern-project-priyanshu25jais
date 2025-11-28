// Frontend/src/pages/Courses.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Chip,
  Modal,
  Avatar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";

const courses = [
  {
    title: "DSA Bootcamp",
    category: "DSA Mastery (C++/Java/Python)",
    duration: "8 weeks",
    difficulty: "Intermediate",
    cta: "Start Learning",
    mentor: {
      name: "Priya Sharma",
      avatar:
        "https://images.pexels.com/photos/3760852/pexels-photo-3760852.jpeg?auto=compress&cs=tinysrgb&w=200",
      role: "Senior Software Engineer",
    },
    topics: [
      "Arrays & Strings",
      "Linked Lists & Stacks",
      "Trees & Graphs",
      "Dynamic Programming",
      "Greedy Algorithms",
      "Backtracking",
      "Trie & Segment Trees",
      "Advanced Problem Solving",
    ],
    outcomes: [
      "Solve 200+ coding problems",
      "Master time & space complexity",
      "Ace technical interviews",
      "Build problem-solving intuition",
    ],
    weeklySchedule: [
      "Week 1-2: Arrays, Strings, Linked Lists",
      "Week 3-4: Trees, Graphs, Recursion",
      "Week 5-6: Dynamic Programming, Greedy",
      "Week 7-8: Advanced Topics & Mock Interviews",
    ],
    modules: [
      { id: 1, title: "Introduction to DSA", unlocked: true, completed: true },
      { id: 2, title: "Arrays & Strings", unlocked: true, completed: true },
      { id: 3, title: "Linked Lists", unlocked: true, completed: false },
      { id: 4, title: "Stacks & Queues", unlocked: false, completed: false },
      { id: 5, title: "Trees", unlocked: false, completed: false },
      { id: 6, title: "Graphs", unlocked: false, completed: false },
      { id: 7, title: "Dynamic Programming", unlocked: false, completed: false },
      { id: 8, title: "Advanced Topics", unlocked: false, completed: false },
    ],
  },
  {
    title: "MERN Project Course",
    category: "MERN Full-Stack Development",
    duration: "6 weeks",
    difficulty: "Advanced",
    cta: "Start Now",
    mentor: {
      name: "Rahul Verma",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
      role: "Full-Stack Mentor",
    },
    topics: [
      "React Fundamentals",
      "Node.js & Express",
      "MongoDB & Mongoose",
      "RESTful APIs",
      "Authentication & Authorization",
      "Deployment & DevOps",
    ],
    outcomes: [
      "Build 3 full-stack projects",
      "Deploy to production",
      "Understand MERN architecture",
      "Work with real databases",
    ],
    weeklySchedule: [
      "Week 1-2: React & Frontend Setup",
      "Week 3-4: Backend with Node.js & Express",
      "Week 5: Database & APIs",
      "Week 6: Deployment & Final Project",
    ],
    modules: [
      { id: 1, title: "React Basics", unlocked: true, completed: true },
      { id: 2, title: "State Management", unlocked: true, completed: false },
      { id: 3, title: "Node.js Setup", unlocked: false, completed: false },
      { id: 4, title: "Express & APIs", unlocked: false, completed: false },
      { id: 5, title: "MongoDB Integration", unlocked: false, completed: false },
      { id: 6, title: "Final Project", unlocked: false, completed: false },
    ],
  },
  {
    title: "System Design & DBMS Basics",
    category: "System Design & DBMS Basics",
    duration: "5 weeks",
    difficulty: "Intermediate",
    cta: "Explore",
    mentor: {
      name: "Ananya Iyer",
      avatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
      role: "System Design Expert",
    },
    topics: [
      "Database Design",
      "SQL & NoSQL",
      "System Architecture",
      "Scalability Patterns",
      "Caching Strategies",
      "Load Balancing",
    ],
    outcomes: [
      "Design scalable systems",
      "Choose right database",
      "Handle high traffic",
      "System design interviews",
    ],
    weeklySchedule: [
      "Week 1: Database Fundamentals",
      "Week 2: SQL & NoSQL Deep Dive",
      "Week 3: System Architecture",
      "Week 4-5: Scalability & Design Patterns",
    ],
    modules: [
      { id: 1, title: "DBMS Basics", unlocked: true, completed: false },
      { id: 2, title: "SQL Queries", unlocked: false, completed: false },
      { id: 3, title: "NoSQL Databases", unlocked: false, completed: false },
      { id: 4, title: "System Design", unlocked: false, completed: false },
      { id: 5, title: "Case Studies", unlocked: false, completed: false },
    ],
  },
  {
    title: "Communication Skills",
    category: "Soft Skills + Interview Preparation",
    duration: "4 weeks",
    difficulty: "Beginner",
    cta: "Join Free",
    mentor: {
      name: "Ananya Iyer",
      avatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
      role: "Career & Communication Coach",
    },
    topics: [
      "Public Speaking",
      "Email Etiquette",
      "Interview Communication",
      "Body Language",
      "Active Listening",
      "Presentation Skills",
    ],
    outcomes: [
      "Confident communication",
      "Ace behavioral interviews",
      "Professional email writing",
      "Effective presentations",
    ],
    weeklySchedule: [
      "Week 1: Communication Fundamentals",
      "Week 2: Interview Skills",
      "Week 3: Professional Writing",
      "Week 4: Practice & Feedback",
    ],
    modules: [
      { id: 1, title: "Basics of Communication", unlocked: true, completed: false },
      { id: 2, title: "Interview Prep", unlocked: false, completed: false },
      { id: 3, title: "Email Writing", unlocked: false, completed: false },
      { id: 4, title: "Final Practice", unlocked: false, completed: false },
    ],
  },
];

const difficultyColor = (level) => {
  if (level === "Beginner") return "success";
  if (level === "Intermediate") return "warning";
  return "error";
};

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCourse(null);
  };

  const handleAddToRoadmap = (course) => {
    alert(`${course.title} added to your roadmap!`);
  };

  const getProgressPercentage = (modules) => {
    const completed = modules.filter((m) => m.completed).length;
    return Math.round((completed / modules.length) * 100);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Courses
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Learn the <strong>exact skills</strong> you need for placements,
        projects, and real-world work. Mix technical depth with soft skills so
        you are ready for interviews and team environments.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Recommended tracks
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Chip label="DSA Mastery (C++ / Java / Python)" />
          <Chip label="MERN Full-Stack Development" />
          <Chip label="System Design & DBMS Basics" />
          <Chip label="Soft Skills + Interview Preparation" />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {courses.map((course) => {
          const progress = getProgressPercentage(course.modules);
          return (
            <Grid item xs={12} md={6} key={course.title}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 5,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {course.title}
                    </Typography>
                    {progress > 0 && (
                      <Chip
                        label={`${progress}%`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {course.category}
                  </Typography>

                  {/* Mentor Info */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1.5,
                    }}
                  >
                    <Avatar
                      src={course.mentor.avatar}
                      sx={{ width: 32, height: 32 }}
                    >
                      {course.mentor.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="caption" display="block">
                        Mentor: <strong>{course.mentor.name}</strong>
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {course.mentor.role}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mb: 1.5,
                      flexWrap: "wrap",
                    }}
                  >
                    <Chip label={`Duration: ${course.duration}`} size="small" />
                    <Chip
                      label={course.difficulty}
                      size="small"
                      color={difficultyColor(course.difficulty)}
                    />
                  </Box>

                  {/* Progress Bar */}
                  {progress > 0 && (
                    <Box sx={{ mb: 1.5 }}>
                      <Box
                        sx={{
                          width: "100%",
                          height: 8,
                          bgcolor: "action.disabledBackground",
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${progress}%`,
                            height: "100%",
                            bgcolor: "primary.main",
                            transition: "width 0.3s ease",
                          }}
                        />
                      </Box>
                    </Box>
                  )}

                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleOpenModal(course)}
                    >
                      {course.cta}
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<PlaylistAddCheckRoundedIcon />}
                      onClick={() => handleAddToRoadmap(course)}
                    >
                      Add to Roadmap
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Course Details Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: 600 },
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            overflow: "auto",
          }}
        >
          {selectedCourse && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  borderBottom: 1,
                  borderColor: "divider",
                }}
              >
                <Typography variant="h5">{selectedCourse.title}</Typography>
                <IconButton onClick={handleCloseModal}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Box sx={{ p: 3 }}>
                {/* Mentor Info */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 3,
                    p: 2,
                    bgcolor: "action.hover",
                    borderRadius: 2,
                  }}
                >
                  <Avatar src={selectedCourse.mentor.avatar}>
                    {selectedCourse.mentor.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1">
                      {selectedCourse.mentor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedCourse.mentor.role}
                    </Typography>
                  </Box>
                </Box>

                {/* Topics */}
                <Typography variant="h6" gutterBottom>
                  Topics Covered
                </Typography>
                <List dense>
                  {selectedCourse.topics.map((topic, idx) => (
                    <ListItem key={idx}>
                      <ListItemText primary={`• ${topic}`} />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                {/* Outcomes */}
                <Typography variant="h6" gutterBottom>
                  Learning Outcomes
                </Typography>
                <List dense>
                  {selectedCourse.outcomes.map((outcome, idx) => (
                    <ListItem key={idx}>
                      <ListItemText primary={`✓ ${outcome}`} />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                {/* Weekly Schedule */}
                <Typography variant="h6" gutterBottom>
                  Weekly Schedule
                </Typography>
                <List dense>
                  {selectedCourse.weeklySchedule.map((week, idx) => (
                    <ListItem key={idx}>
                      <ListItemText primary={week} />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 2 }} />

                {/* Modules */}
                <Typography variant="h6" gutterBottom>
                  Course Modules
                </Typography>
                <List>
                  {selectedCourse.modules.map((module) => (
                    <ListItem
                      key={module.id}
                      sx={{
                        bgcolor: module.unlocked
                          ? "action.hover"
                          : "action.disabledBackground",
                        mb: 1,
                        borderRadius: 2,
                      }}
                    >
                      {module.completed ? (
                        <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                      ) : module.unlocked ? (
                        <RadioButtonUncheckedIcon
                          color="primary"
                          sx={{ mr: 1 }}
                        />
                      ) : (
                        <LockIcon color="disabled" sx={{ mr: 1 }} />
                      )}
                      <ListItemText
                        primary={module.title}
                        secondary={
                          module.unlocked
                            ? module.completed
                              ? "Completed"
                              : "Available"
                            : "Locked"
                        }
                      />
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      handleAddToRoadmap(selectedCourse);
                      handleCloseModal();
                    }}
                    startIcon={<PlaylistAddCheckRoundedIcon />}
                  >
                    Add to Roadmap
                  </Button>
                  <Button variant="outlined" fullWidth onClick={handleCloseModal}>
                    Close
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default Courses;
