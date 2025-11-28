import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const Contact = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Have questions, feedback, or need help with mentorship? Use the form
        below or reach us through the contact details on this page.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact details
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                📍 <strong>Location:</strong> Your College / Institution campus
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                ✉ <strong>Email:</strong> support@mentormentee.com
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                📞 <strong>Helpline:</strong> +91‑XXXXXXXXXX
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ⏱ <strong>Response time:</strong> within 24 hours on working days
              </Typography>
            </CardContent>
          </Card>

         
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact form
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Fill in the details below and we will get back to you as soon as
                possible.
              </Typography>
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "Thank you for contacting us! We will get back to you soon."
                  );
                }}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField label="Full Name" name="name" required fullWidth />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  required
                  fullWidth
                />
                <TextField
                  label="Topic"
                  name="topic"
                  required
                  fullWidth
                  placeholder="e.g. Query about mentorship, feedback, technical issue"
                />
                <TextField
                  label="Message"
                  name="message"
                  required
                  fullWidth
                  multiline
                  minRows={4}
                />
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;

