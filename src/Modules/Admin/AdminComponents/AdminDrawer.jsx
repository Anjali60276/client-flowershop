import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';

export default function AdminDrawer() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    // Fetch total products
    axios.get("http://localhost:8000/api/product/Getproduct")
      .then(res => setTotalProducts(res.data.getproduct.length))
      .catch(err => console.log(err));

    // Fetch total categories
    axios.get("http://localhost:8000/api/category/GetCategory")
      .then(res => setTotalCategories(res.data.getcategory.length))
      .catch(err => console.log(err));

    // Fetch total users
    axios.get("http://localhost:8000/api/user/Getuser")
      .then(res => setTotalUsers(res.data.getusers.length))
      .catch(err => console.log(err));

    // Fetch total orders
    axios.get("http://localhost:8000/api/order/GetAllOrders")
      .then(res => setTotalOrders(res.data.orders.length))
      .catch(err => console.log(err));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#971243', fontWeight: 'bold' }}>
        Welcome to Flower Shop Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Products Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff', boxShadow: 3, '&:hover': { boxShadow: 6, transform: 'translateY(-5px)', transition: '0.3s' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalFloristIcon sx={{ fontSize: 40, color: '#971243', mr: 2 }} />
                <Typography variant="h6" sx={{ color: '#971243' }}>Total Products</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>{totalProducts}</Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>Flower varieties available</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Categories Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff', boxShadow: 3, '&:hover': { boxShadow: 6, transform: 'translateY(-5px)', transition: '0.3s' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CategoryIcon sx={{ fontSize: 40, color: '#ef6694', mr: 2 }} />
                <Typography variant="h6" sx={{ color: '#ef6694' }}>Categories</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>{totalCategories}</Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>Product categories</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Users Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff', boxShadow: 3, '&:hover': { boxShadow: 6, transform: 'translateY(-5px)', transition: '0.3s' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ fontSize: 40, color: '#971243', mr: 2 }} />
                <Typography variant="h6" sx={{ color: '#971243' }}>Total Users</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>{totalUsers}</Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>Registered customers</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Orders Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#fff', boxShadow: 3, '&:hover': { boxShadow: 6, transform: 'translateY(-5px)', transition: '0.3s' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShoppingCartIcon sx={{ fontSize: 40, color: '#ef6694', mr: 2 }} />
                <Typography variant="h6" sx={{ color: '#ef6694' }}>Total Orders</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>{totalOrders}</Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>Orders this month</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
