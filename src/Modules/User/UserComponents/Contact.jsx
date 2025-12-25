import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import axios from "axios";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Scroll to contact section when page loads
  useEffect(() => {
    const section = document.getElementById("contact-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ STOP PAGE REFRESH

    if (!contact.name || !contact.email || !contact.message) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/contact",
        contact
      );

      alert(res.data.message || "Message sent successfully!");

      setContact({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="contact-section"
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "100px 20px",
        background: "linear-gradient(to right, #ffe6f0, #fff5f8)",
        minHeight: "80vh",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "600px",
          padding: "30px",
          borderRadius: "15px",
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 8px 24px rgba(255, 182, 193, 0.4)",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{ fontFamily: "cursive", color: "#d63384" }}
        >
          Contact Us
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={contact.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={contact.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Message"
            name="message"
            value={contact.message}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
              borderRadius: 2,
              backgroundColor: "#ff69b4",
              "&:hover": { backgroundColor: "#d63384" },
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
