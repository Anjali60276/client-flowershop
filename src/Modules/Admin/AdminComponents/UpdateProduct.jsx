import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../../ContextProvider';

export default function UpdateProduct() {
  const { host } = useContext(UserContext);
  const { pid } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    pname: '',
    pdesc: '',
    pprice: '',
    pqty: '',
    catid: '',
    pimage: null,
    oldImage: '',
  });

  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    axios
      .get(`${host}/api/category/GetCategory`)
      .then((res) => {
        console.log('Fetched categories:', res.data.getcategory);
        setCategories(res.data.getcategory || []);
      })
      .catch((error) => {
        console.log('Error fetching categories:', error);
        setCategories([]);
      });
  }, [host]);

  // Fetch existing product details
  useEffect(() => {
    if (!pid) return;
    
    axios
      .get(`${host}/api/product/GetproductById/${pid}`)
      .then((res) => {
        const data = res.data.oneproduct;
        console.log('Fetched product:', data);

        setProduct({
          pname: data.pname || '',
          pdesc: data.pdesc || '',
          pprice: data.pprice || '',
          pqty: data.pqty || '',
          catid: data.catid || '',
          pimage: null,
          oldImage: data.pimage || '',
        });
      })
      .catch((error) => {
        console.log('Error fetching product:', error);
      });
  }, [pid, host]);

  const handleChange = (e) => {
    if (e.target.name === 'pimage') {
      setProduct({ ...product, pimage: e.target.files[0] });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('pname', product.pname);
    formData.append('pdesc', product.pdesc);
    formData.append('pprice', product.pprice);
    formData.append('pqty', product.pqty);
    formData.append('catid', product.catid);

    // Only append new image if one was selected
    if (product.pimage) {
      formData.append('pimage', product.pimage);
    }

    axios
      .put(`${host}/api/product/Updateproduct/${pid}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log('Product updated:', res.data);
        alert('Product Updated Successfully!');
        navigate('/Admin/ViewProduct');
      })
      .catch((error) => {
        console.log('Error updating product:', error);
        alert('Update failed!');
      });
  };

  const handleCancel = () => {
    navigate('/Admin/ViewProduct');
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: 1, ml: '150px', mb: '90px' }}>
        <Toolbar />
        <Box display="flex" justifyContent="center">
          <Paper elevation={4} sx={{ width: 600, p: 4 }}>
            <Typography
              variant="h4"
              sx={{ mb: 4, color: '#971243', fontWeight: 'bold' }}
              textAlign="center"
            >
              Update Product
            </Typography>

            <TextField
              variant="outlined"
              label="Product Name"
              name="pname"
              value={product.pname}
              fullWidth
              sx={{ mb: 3 }}
              onChange={handleChange}
              required
            />

            <TextField
              variant="outlined"
              label="Product Description"
              name="pdesc"
              value={product.pdesc}
              fullWidth
              sx={{ mb: 3 }}
              onChange={handleChange}
              required
              multiline
              rows={3}
            />

            <TextField
              variant="outlined"
              label="Product Price"
              type="number"
              name="pprice"
              value={product.pprice}
              fullWidth
              sx={{ mb: 3 }}
              onChange={handleChange}
              required
            />

            <TextField
              variant="outlined"
              label="Quantity"
              type="number"
              name="pqty"
              value={product.pqty}
              fullWidth
              sx={{ mb: 3 }}
              onChange={handleChange}
              required
            />

            {/* Category Select */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="catid"
                value={product.catid}
                onChange={handleChange}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Current Image Display */}
            {product.oldImage && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                  Current Image:
                </Typography>
                <img
                  src={`${host}/uploads/${product.oldImage}`}
                  alt="Product"
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '2px solid #971243',
                  }}
                />
              </Box>
            )}

            {/* New Image Upload */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, color: '#666' }}>
                Upload New Image (optional):
              </Typography>
              <TextField
                type="file"
                name="pimage"
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: 'image/*' }}
              />
            </Box>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={handleUpdate}
                sx={{
                  bgcolor: '#971243',
                  '&:hover': { bgcolor: '#ef6694' },
                  px: 4,
                }}
                size="large"
              >
                Update Product
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  color: '#971243',
                  borderColor: '#971243',
                  '&:hover': {
                    borderColor: '#ef6694',
                    bgcolor: 'rgba(151, 18, 67, 0.04)',
                  },
                  px: 4,
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