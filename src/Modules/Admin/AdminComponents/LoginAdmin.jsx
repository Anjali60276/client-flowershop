import React, { useState, useContext } from "react";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../ContextProvider";

export default function LoginAdmin() { // ✅ Renamed here
  const { host } = useContext(UserContext); // Backend host
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  // Update state on input change
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  // Admin login function
  const handleAdminLogin = async () => {
    try {
      const res = await axios.post(`${host}/api/user/Login`, login);

      if (res.data.success) {
        // Check if the logged-in user is admin
        if (res.data.role !== "admin") {
          Swal.fire("Access Denied", "You are not an Admin!", "error");
          return;
        }

        // Save token and role in localStorage
        localStorage.setItem("userToken", res.data.Token);
        localStorage.setItem("userRole", res.data.role);

        Swal.fire("Success", "Admin Login Successful!", "success").then(() => {
          navigate("/Admin/Dashboard");
        });
      } else {
        Swal.fire("Error", res.data.message || "Login Failed", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
      console.log(error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={4} style={{ width: 400, padding: 20 }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Admin Login
        </Typography>

        <TextField
          label="Email"
          name="email"
          fullWidth
          sx={{ mb: 3 }}
          value={login.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          fullWidth
          sx={{ mb: 3 }}
          value={login.password}
          onChange={handleChange}
        />

        <Button fullWidth variant="contained" onClick={handleAdminLogin}>
          Login
        </Button>
      </Paper>
    </Box>
  );
}
