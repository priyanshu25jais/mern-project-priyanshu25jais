import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Rating,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const mentors = [
  {
    name: "Priya Sharma",
    role: "Senior Software Engineer",
    rating: 4.9,
    expertise: "DSA · System Design · Product-based Interviews",
    avatar:
      "https://images.pexels.com/photos/3760852/pexels-photo-3760852.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Rahul Verma",
    role: "Full‑Stack Mentor",
    rating: 4.8,
    expertise: "MERN · Projects · Clean Code",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    name: "Ananya Iyer",
    role: "Career & Communication Coach",
    rating: 4.8,
    expertise: "Communication · Confidence · Presentation Skills",
    avatar:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [mentorIndex, setMentorIndex] = useState(0);

  const nextMentor = () => {
    setMentorIndex((prev) => (prev + 1) % mentors.length);
  };

  const prevMentor = () => {
    setMentorIndex((prev) => (prev - 1 + mentors.length) % mentors.length);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          mb: 6,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to the Mentor–Mentee Portal
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We connect ambitious mentees with experienced industry mentors.
            Learn faster, stay accountable, and get real, practical guidance
            instead of generic advice.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 1, mb: 2 }}>
            <Chip label="1‑to‑1 Mentorship" color="primary" />
            <Chip label="Structured Roadmaps" variant="outlined" />
            <Chip label="Real‑time Feedback" variant="outlined" />
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/register")}
            sx={{ mt: 2 }}
          >
            Find Your Mentor
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              maxWidth: 360,
              width: "100%",
              boxShadow: 4,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                What we provide
              </Typography>
              <Typography variant="body2" color="text.secondary" component="div">
                <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
                  <li>
                    <strong>1‑to‑1 Mentorship:</strong> mentors aligned with
                    your goals (career, coding, communication, interviews, etc.).
                  </li>
                  <li>
                    <strong>Personalized Roadmaps:</strong> step‑by‑step plans
                    tailored to your level.
                  </li>
                  <li>
                    <strong>Task & Feedback System:</strong> clear tasks,
                    reviews, and improvements.
                  </li>
                  <li>
                    <strong>Chat & Support:</strong> ask doubts and get unstuck
                    quickly.
                  </li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Top mentors - Carousel */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Top Mentors
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Some of our highest‑rated mentors helping learners achieve real
          results:
        </Typography>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton
            onClick={prevMentor}
            sx={{
              position: "absolute",
              left: -20,
              zIndex: 1,
              bgcolor: "background.paper",
              boxShadow: 2,
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Grid container spacing={3} sx={{ flex: 1, px: 4 }}>
            {mentors.map((m, idx) => {
              const displayIndex = (mentorIndex + idx) % mentors.length;
              const mentor = mentors[displayIndex];
              return (
                <Grid item xs={12} sm={6} md={4} key={`${mentor.name}-${idx}`}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 1,
                        }}
                      >
                        <Avatar src={mentor.avatar} alt={mentor.name}>
                          {mentor.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1">
                            {mentor.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {mentor.role}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Rating
                          value={mentor.rating}
                          precision={0.1}
                          readOnly
                          size="small"
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ ml: 0.5 }}
                        >
                          {mentor.rating.toFixed(1)}★
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {mentor.expertise}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <IconButton
            onClick={nextMentor}
            sx={{
              position: "absolute",
              right: -20,
              zIndex: 1,
              bgcolor: "background.paper",
              boxShadow: 2,
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            mt: 2,
          }}
        >
          {mentors.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => setMentorIndex(idx)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor:
                  idx === mentorIndex ? "primary.main" : "action.disabled",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Why we are best */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Why we are the best choice for you
        </Typography>
        <Card>
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
            >
              <ul style={{ paddingLeft: "1.25rem", margin: 0 }}>
                <li>
                  <strong>Real mentors, not random tutors:</strong> all mentors
                  are screened for experience, communication, and mentoring
                  ability.
                </li>
                <li>
                  <strong>Outcome‑focused:</strong> we track your tasks,
                  progress, and milestones so you can actually see your growth.
                </li>
                <li>
                  <strong>Balanced growth:</strong> we care about skills{" "}
                  <em>and</em> mindset—technical knowledge, confidence,
                  discipline, and clarity.
                </li>
                <li>
                  <strong>Simple interface:</strong> one place to manage
                  sessions, tasks, feedback, and communication.
                </li>
              </ul>
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Success statistics & testimonials */}
      <Box sx={{ mb: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Our impact in numbers
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h4">500+</Typography>
                    <Typography variant="body2" color="text.secondary">
                      mentee journeys guided
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h4">4.8★</Typography>
                    <Typography variant="body2" color="text.secondary">
                      average mentor rating
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h4">80%</Typography>
                    <Typography variant="body2" color="text.secondary">
                      report higher confidence
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h4">70%</Typography>
                    <Typography variant="body2" color="text.secondary">
                      achieved a career milestone
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  What our mentees say
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  “My mentor didn&apos;t just teach me concepts – they helped me
                  plan my week, review my projects, and prepare for interviews.
                  In three months I went from confused to confident.”
                </Typography>
                <Typography variant="subtitle2">Aarav, B.Tech student</Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Cracked his first full‑time developer role
                </Typography>

                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    “The accountability and constant feedback kept me consistent.
                    I finally built a portfolio I&apos;m proud of.”
                  </Typography>
                  <Typography variant="subtitle2">Shreya, self‑taught developer</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* How it works */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          How it works
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  1️⃣ Sign Up
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create your learner or mentor account in a few simple steps.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  2️⃣ Connect
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mentees select mentors based on goals, domain, and style.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  3️⃣ Learn
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Follow tasks, attend sessions, and track your progress in one
                  place.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  4️⃣ Grow
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Improve your skills, mindset, and career confidence step by
                  step.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Success Stories Videos */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Success Stories Videos
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Watch real mentees share their journey and achievements:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    bgcolor: "action.hover",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Video: From Confused to Confident
                  </Typography>
                </Box>
                <Typography variant="subtitle1" gutterBottom>
                  Aarav&apos;s Journey
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  How mentorship helped him land his first developer role at a
                  product-based company.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    bgcolor: "action.hover",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Video: Building a Portfolio
                  </Typography>
                </Box>
                <Typography variant="subtitle1" gutterBottom>
                  Shreya&apos;s Story
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  From self-taught to confident: how structured mentorship
                  transformed her learning path.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    bgcolor: "action.hover",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Video: Interview Success
                  </Typography>
                </Box>
                <Typography variant="subtitle1" gutterBottom>
                  Rohan&apos;s Achievement
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  How mock interviews and feedback sessions helped him crack
                  multiple offers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Top Companies */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Top Companies Where Our Mentees Got Placed
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Our mentees have successfully secured positions at leading tech
          companies:
        </Typography>
        <Grid container spacing={2}>
          {[
            "Google",
            "Microsoft",
            "Amazon",
            "Meta",
            "Apple",
            "Netflix",
            "Adobe",
            "Salesforce",
            "Oracle",
            "IBM",
            "Accenture",
            "TCS",
          ].map((company) => (
            <Grid item xs={6} sm={4} md={3} key={company}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 2,
                  "&:hover": {
                    boxShadow: 4,
                    transform: "translateY(-4px)",
                    transition: "all 0.3s",
                  },
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  {company}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Outlet />
    </Container>
  );
};

export default Home;
