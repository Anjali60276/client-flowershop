import React from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ManageProfile() {
  const [profile, setProfile] = useState({
    uname: "",
    uemail: "",
    uphoneno: "",
    uaddress: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // fetch profile details from server using token
    const token = localStorage.getItem("UserToken");
    console.log("User token", token);
    if (token) {
      axios
        .get("http://localhost:7000/api/user/GetProfile", {
          headers: { "auth-token": token },
        })
        .then((res) => {
          // setProfile(response.data.user)
          // setProfile(res.data.user)
          // console.log( res.data.user);
          const userdata = res.data.user;
          console.log("dataaa",userdata)
          setProfile({
            uname: userdata.name,
            uemail: userdata.email,
            uphoneno: userdata.phone,
            uaddress: userdata.address,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("token not found");
    }
  }, []);
 
  const handleProfileUpdate = () => {
    const token = localStorage.getItem("UserToken");
    axios
      .put("http://localhost:7000/api/user/UpdateProfile", profile, {
        headers: { "auth-token": token },
      })
      .then((res) => {
        alert(res.data.message);
        setProfile(res.data.users);
      })

      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "400px", //  Smaller card width
            padding: "10px",
            margin: "30px",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Typography variant="h5" sx={{ mb: 3 }} align="center">
            Manage Profile
          </Typography>

          <TextField
            variant="outlined"
            label="Name"
            type="text"
            name="uname"
            fullWidth
            value={profile.uname}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            name="uemail"
            fullWidth
            value={profile.uemail}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            label="Phone"
            type="text"
            name="uphoneno"
            fullWidth
            value={profile.uphoneno}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            label="Address"
            type="text"
            name="uaddress"
            fullWidth
            value={profile.uaddress}
            onChange={handleChange}
          />

          <Button
            variant="contained"
            // onClick={handlesubmit}
            color="error"
            sx={{
              mt: 1,
              width: "100px",
              height: "40px",
              minWidth: 0,
              borderRadius: 0,
              fontSize: "0.75rem",
              alignSelf: "center",
            }}
            onClick={handleProfileUpdate}
          >
            Update Profile
          </Button>
        </Paper>
      </Box>
    </div>
  );
}
