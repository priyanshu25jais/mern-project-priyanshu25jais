import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Link,
  List,
  ListItem,
} from "@mui/material";

const Resources = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Resources
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Helpful mentorship material to support your{" "}
        <strong>learning, communication, and career preparation</strong>.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Motivational videos
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Stay Consistent & Disciplined
                </Typography>
                <Link
                  href="https://www.youtube.com/watch?v=ZXsQAXx_ao0"
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch on YouTube
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Build an Unshakable Growth Mindset
                </Typography>
                <Link
                  href="https://www.youtube.com/watch?v=mgmVOuLgFB0"
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch on YouTube
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Learning & skill‑building videos
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  React & JS Basics
                </Typography>
                <Link
                  href="https://www.youtube.com/watch?v=Ke90Tje7VS0"
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch on YouTube
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  MERN Stack Project
                </Typography>
                <Link
                  href="https://www.youtube.com/watch?v=Oe421EPjeBE"
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch on YouTube
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Communication & Speaking
                </Typography>
                <Link
                  href="https://www.youtube.com/watch?v=Y9U9IE0gVHA"
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch on YouTube
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Self‑improvement habits
        </Typography>
        <Card>
          <CardContent>
            <List dense>
              <ListItem>
                Daily reflection: write what you learned and what you’ll
                improve.
              </ListItem>
              <ListItem>
                Weekly goals: set 3 clear goals and track progress with your
                mentor.
              </ListItem>
              <ListItem>
                Learning rhythm: at least 1–2 hours of focused,
                distraction‑free work daily.
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>

      {/* Templates / Guides / Tools */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Templates
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Resume templates
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Clean, ATS‑friendly resume formats for freshers and
                  professionals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Email writing templates
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ready‑to‑use emails for reaching out to mentors, HR, and
                  connections.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Networking / feedback templates
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Simple messages for asking feedback and building your network.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Guides (downloadable PDFs)
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  How to talk to mentors effectively
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Learn how to ask better questions and use mentor time wisely.
                </Typography>
                <Link href="#" underline="hover">
                  Download guide
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Placement preparation roadmap
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Step‑by‑step plan for DSA, projects, aptitude, and interviews.
                </Typography>
                <Link href="#" underline="hover">
                  Download roadmap
                </Link>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  GitHub portfolio guide
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Make your GitHub profile and repos stand out to recruiters.
                </Typography>
                <Link href="#" underline="hover">
                  Download guide
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Tools
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Calendar booking tool
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Use any calendar app (Google Calendar, Calendly, etc.) to fix
                  mentorship slots and avoid confusion.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Task checklist
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Maintain a weekly checklist of tasks, reflections, and
                  deadlines.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Coding challenge links
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Practice DSA and coding challenges on platforms like LeetCode,
                  CodeStudio, or HackerRank.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Resources;

