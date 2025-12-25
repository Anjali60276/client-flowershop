import React, { useState, useEffect, useContext } from "react";
import { Box, Paper, Typography, TextField, Button, Toolbar } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../../ContextProvider";

export default function UpdateCategory() {
  const { host } = useContext(UserContext);
  const { cid } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    cname: "",
    cdescription: "",
  });

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!cid) return;
    axios
      .get(`${host}/api/category/GetCategoryById/${cid}`)
      .then((res) => {
        const one = res.data.onecategory || {};
        setCategory({
          cname: one.category_name || "",
          cdescription: one.category_description || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, [cid, host]);

  const handleUpdate = () => {
    const payload = {
      category_name: category.cname,
      category_description: category.cdescription,
    };

    axios
      .put(`${host}/api/category/UpdateCategory/${cid}`, payload)
      .then(() => {
        alert("Category updated successfully");
        navigate("/Admin/ViewCategory");
      })
      .catch((error) => {
        console.log("Error while updating category:", error);
        alert("Error updating category");
      });
  };

  const handleCancel = () => {
    navigate("/Admin/ViewCategory");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 1, ml: "150px", mb: "90px" }}>
        <Toolbar />
        <Box display="flex" justifyContent="center">
          <Paper elevation={4} sx={{ width: 600, p: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ mb: 4, color: '#971243', fontWeight: 'bold' }} 
              textAlign="center"
            >
              Update Category
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
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={handleUpdate}
                sx={{
                  bgcolor: '#971243',
                  '&:hover': { bgcolor: '#ef6694' },
                  px: 4
                }}
                size="large"
              >
                Update Category
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  color: '#971243',
                  borderColor: '#971243',
                  '&:hover': { 
                    borderColor: '#ef6694',
                    bgcolor: 'rgba(151, 18, 67, 0.04)'
                  },
                  px: 4
                }}
                size="large"
              >
                Cancel
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}