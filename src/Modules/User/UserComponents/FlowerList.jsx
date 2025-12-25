import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const FlowerList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const API_URL = 'http://localhost:8000/api';

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/product/Getproduct`);
      setProducts(response.data.getproduct);
      setError('');
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/category/GetCategory`);
      setCategories(response.data.getcategory);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const addToCart = async (productId) => {
    const token = localStorage.getItem('userToken');
    
    if (!token) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        `${API_URL}/cart/AddToCart`,
        { productId, quantity: 1 },
        { headers: { 'auth-token': token } }
      );
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  const handleViewDetails = (productId) => {
    navigate(`/flowerdetails/${productId}`);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.pname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.pdesc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.catid?._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress sx={{ color: '#971243' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #971243, #ef6694)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            Our Flower Collection
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Discover the perfect blooms for every occasion
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search flowers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, minWidth: '250px', bgcolor: 'white' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#971243' }} />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl sx={{ minWidth: 200, bgcolor: 'white' }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {filteredProducts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No products found
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 12px rgba(151, 18, 67, 0.2)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={
                      product.pimage
                        ? `${API_URL.replace('/api', '')}/uploads/${product.pimage}`
                        : 'https://via.placeholder.com/300x180?text=No+Image'
                    }
                    alt={product.pname}
                    sx={{ objectFit: 'cover' }}
                  />
                  
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" component="div" fontWeight="bold" fontSize="1rem">
                        {product.pname}
                      </Typography>
                      {product.catid && (
                        <Chip
                          label={product.catid.category_name}
                          size="small"
                          sx={{
                            bgcolor: '#f8bbd0',
                            color: '#971243',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            height: '24px'
                          }}
                        />
                      )}
                    </Box>
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        fontSize: '0.875rem'
                      }}
                    >
                      {product.pdesc}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: '#971243', fontSize: '1.125rem' }}>
                        ₹{product.pprice}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
                        Stock: {product.pqty}
                      </Typography>
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ p: 1.5, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ShoppingCartIcon sx={{ fontSize: '1.1rem' }} />}
                      onClick={() => addToCart(product._id)}
                      disabled={product.pqty === 0}
                      size="small"
                      sx={{
                        bgcolor: '#971243',
                        '&:hover': { bgcolor: '#ef6694' },
                        mr: 0.5,
                        fontSize: '0.875rem',
                        py: 0.8
                      }}
                    >
                      {product.pqty === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                    
                    <IconButton
                      color="primary"
                      onClick={() => handleViewDetails(product._id)}
                      size="small"
                      sx={{
                        border: '1px solid #971243',
                        '&:hover': { bgcolor: '#f8bbd0' }
                      }}
                    >
                      <VisibilityIcon sx={{ fontSize: '1.1rem' }} />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default FlowerList;