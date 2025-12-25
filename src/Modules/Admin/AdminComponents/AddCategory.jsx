import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../../../ContextProvider"; // Fixed typo: Contex -> Context
import { useContext } from "react";

export default function AddCategory() {
  const { host } = useContext(UserContext); // Fixed typo: UserContex -> UserContext
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    cname: "",
    cdescription: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleViewCategory = () => {
    navigate("/Admin/ViewCategory");
  };

  const handleSubmit = () => {
    console.log(category);
    axios
      .post(`${host}/api/category/addCategory`, category) // Fixed: Addcategory -> addCategory
      .then((res) => {
        console.log("Category details", res.data);
        alert("Category added successfully");
        // Clear form after success
        setCategory({ cname: "", cdescription: "" });
      })
      .catch((err) => {
        console.log(err);
        alert("Server error: " + (err.response?.data?.message || err.message));
      });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 1, ml: "150px", mb: "90px" }}>
        <Toolbar />
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            onClick={handleViewCategory}
            color="success"
            sx={{ mb: 3 }}
          >
            View Category
          </Button>
        </Box>
        <Box display="flex" justifyContent="center">
          <Paper elevation={4} sx={{ width: 600, p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }} textAlign={"center"}>
              Add Category
            </Typography>
            <TextField
              variant="outlined"
              label="Category Name"
              type="text"
              name="cname"
              value={category.cname}
              fullWidth
              sx={{ mb: 4 }}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              label="Category Description"
              type="text"
              name="cdescription"
              value={category.cdescription}
              fullWidth
              sx={{ mb: 3 }}
              onChange={handleChange}
              required
              multiline
              rows={3}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              color="success"
              fullWidth
              size="large"
            >
              Add Category
            </Button>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}
