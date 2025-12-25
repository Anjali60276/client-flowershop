import React from 'react'
import { useState } from 'react';
import { Box, Typography, TextField, Button, Link , Paper} from '@mui/material';
import axios from 'axios';

export default function Login() {
    const [login, setLogin] = useState({
        uemail:'',
        upassword:''
    });

    const handleChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value});
        console.log({[e.target.name]: e.target.value});
    }

    const handleLogin = () => {
        // Transform the data to match backend expectations
        const backendData = {
            email: login.uemail,      // Map uemail to email
            password: login.upassword  // Map upassword to password
        };

        console.log("Sending to backend:", backendData);

        axios.post(`http://localhost:8000/api/user/Login`, backendData)
            .then((res) => {
                console.log("API Response:", res.data);
                
                if (res.data.success || res.data.token || res.data.Token || res.data.status === "success") {
                    const token = res.data.Token || res.data.token;
                    if (token) {
                        localStorage.setItem("userToken", token);
                        alert("Login successful!");
                        window.location.href = "/";
                    } else {
                        alert("Login successful but no token received");
                    }
                } else {
                    alert(res.data.message || res.data.error || "Login failed");
                }
            })
            .catch((error) => {
                console.log("Error:", error);
                if (error.response && error.response.data) {
                    alert(error.response.data.message || "Error: " + error.response.status);
                } else {
                    alert("Network or server error occurred");
                }
            });
    };

    return (
        <div>
            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "100px",
                    background: "linear-gradient(to right, #ffe6f0, #fff5f8)", // soft pink gradient
                    minHeight: "80vh",
                    alignItems: "center",
                }}
            >
                <Paper
                    elevation={6}
                    style={{
                        width: "600px",
                        padding: "30px",
                        borderRadius: "15px",
                        background: "rgba(255, 255, 255, 0.95)", // slightly transparent
                        boxShadow: "0 8px 24px rgba(255, 182, 193, 0.4)", // soft pink shadow
                    }}
                >
                    <Typography
                        variant="h4"
                        textAlign="center"
                        gutterBottom
                        sx={{ fontFamily: "cursive", color: "#d63384" }}
                    >
                        Flower Shop Login
                    </Typography>

                    <form>
                        <TextField
                            label="Email"
                            name="uemail"
                            type="email"
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            sx={{
                                "& label": { color: "#d63384" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "#ffc0cb" },
                                    "&:hover fieldset": { borderColor: "#ff69b4" },
                                    "&.Mui-focused fieldset": { borderColor: "#d63384" },
                                },
                            }}
                        />
                        <TextField
                            label="Password"
                            name="upassword"
                            type="password"
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            sx={{
                                "& label": { color: "#d63384" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "#ffc0cb" },
                                    "&:hover fieldset": { borderColor: "#ff69b4" },
                                    "&.Mui-focused fieldset": { borderColor: "#d63384" },
                                },
                            }}
                        />

                        <Button
                            type="button"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 2,
                                borderRadius: 2,
                                backgroundColor: "#ff69b4",
                                "&:hover": { backgroundColor: "#d63384" },
                            }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>

                        <Typography
                            variant="body2"
                            sx={{ mt: 2, color: "#6b1b3a", textAlign: "center" }}
                        >
                            Don't have an account?{' '}
                            <Link href="/Register" underline="hover" sx={{ color: "#d63384" }}>
                                Register
                            </Link>
                        </Typography>
                    </form>
                </Paper>
            </Box>
        </div>
    )
}
