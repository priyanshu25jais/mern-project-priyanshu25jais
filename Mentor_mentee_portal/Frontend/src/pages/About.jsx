import React from "react";
import { Container, Typography, Box, Card, CardContent, Grid } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        About Us
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Mentor–Mentee Portal is built around one belief:{" "}
        <strong>students grow faster with personalized mentorship</strong>.
        Instead of random tutorials, we focus on guided learning, honest
        feedback, and clear progress tracking.
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        We are a student‑driven initiative focused on bridging the skill gap in
        tech careers. Our platform connects students, freshers, and working
        professionals with mentors from domains like software development, data,
        product, and communication skills.
      </Typography>

      <Box sx={{ mt: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          🎯 Our Mission
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              To empower students with personalized mentorship that accelerates
              real‑world success and helps them build strong, confident careers.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          🏫 Who We Are
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              A student‑driven team passionate about mentoring and technology.
              We&apos;ve seen how confusing placements and career choices can be,
              so we built a platform that makes mentorship simple, structured,
              and accessible.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          💡 Why Mentor–Mentee Portal?
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  1‑to‑1 personalized guidance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Work closely with mentors who understand your goals, strengths,
                  and pace instead of generic one‑size‑fits‑all advice.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Track progress transparently
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Use tasks, feedback, and dashboards to see how you are moving
                  from beginner to confident problem solver.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Build confidence & network
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Practice communication, interview skills, and professional
                  etiquette while building real mentor connections.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Community & tech‑driven platform
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Built using modern technologies (like MERN stack) to keep
                  mentoring smooth, fast, and simple to use.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About;

