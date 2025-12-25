import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Toolbar,
  Button,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../../ContextProvider";

export default function AddProduct() {
  const { host } = useContext(UserContext);

  const [product, setProduct] = useState({
    pname: '',
    pdesc: '',
    pprice: '',
    pimage: '',
    catid: '',
    pqty: ''
  });

  const [preview, setPreview] = useState(null); // ✅ added
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${host}/api/category/GetCategory`)
      .then((res) => {
        setCategories(res.data.getcategory || []);
      })
      .catch(() => {
        setCategories([]);
      });
  }, [host]);

  const handleViewProduct = () => {
    navigate('/Admin/ViewProduct');
  };

  const handleChange = (e) => {
    if (e.target.name === 'pimage') {
      const file = e.target.files[0];
      setProduct({ ...product, pimage: file });
      setPreview(URL.createObjectURL(file)); // ✅ preview
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('pname', product.pname);
    formData.append('pdesc', product.pdesc);
    formData.append('pprice', product.pprice);
    formData.append('pqty', product.pqty);
    formData.append('catid', product.catid);
    formData.append('pimage', product.pimage);

    axios.post(`${host}/api/product/AddProduct`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        alert("Product added successfully");
        setProduct({
          pname: '',
          pdesc: '',
          pprice: '',
          pimage: '',
          catid: '',
          pqty: ''
        });
        setPreview(null); // ✅ clear preview
      })
      .catch(() => {
        alert("Server error");
      });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, ml: { xs: 0, sm: '240px' } }}>
      <Toolbar />

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={handleViewProduct}>
          View Product
        </Button>
      </Box>

      <Box display="flex" justifyContent="center">
        <Paper sx={{ width: 600, p: 4 }}>
          <Typography variant="h4" textAlign="center" mb={3}>
            Add Product
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                name="pname"
                fullWidth
                value={product.pname}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Product Description"
                name="pdesc"
                fullWidth
                multiline
                rows={3}
                value={product.pdesc}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Price"
                name="pprice"
                type="number"
                fullWidth
                value={product.pprice}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Quantity"
                name="pqty"
                type="number"
                fullWidth
                value={product.pqty}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="catid"
                  value={product.catid}
                  onChange={handleChange}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* IMAGE INPUT */}
            <Grid item xs={12}>
              <TextField
                type="file"
                name="pimage"
                inputProps={{ accept: "image/*" }}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            {/* IMAGE PREVIEW */}
            {preview && (
              <Grid item xs={12} textAlign="center">
                <Box
                  component="img"
                  src={preview}
                  alt="preview"
                  sx={{
                    width: 120,
                    height: 120,
                    objectFit: 'cover',
                    borderRadius: '12px',
                    border: '2px solid #ff69b4'
                  }}
                />
              </Grid>
            )}
          </Grid>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Add Product
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
