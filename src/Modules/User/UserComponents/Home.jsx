import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import heroFlower from '../../../assets/hero-image.jpg';
import Roses from '../../../assets/Roses.jpg';
import tulips from '../../../assets/tulips.jpg';
import MixedFlowers from '../../../assets/MixedFlowers.jpg';
import pinkbanner from '../../../assets/pinkbanner.jpg';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import slideimg1 from '../../../assets/slideimg1.jpg';
import slideimg2 from '../../../assets/slideimg2.jpg';
import slideimg3 from '../../../assets/slideimg3.jpg';
import slideimg4 from '../../../assets/slideimg4.jpg';

const featuredFlowers = [
  {
    id: 1,
    name: "Red Rose Bouquet",
    description: "Fresh red roses perfect for any occasion",
    price: "INR 100.50",
    image: Roses
  },
  {
    id: 2,
    name: "White Tulips Collection",
    description: "Elegant white Tulips for special moments",
    price: "INR 900.00",
    image: tulips
  },
  {
    id: 3,
    name: "Mixed Spring Flowers",
    description: "Colorful seasonal flowers bouquet",
    price: "INR 322.99",
    image: MixedFlowers
  }
];

// Array of slide images for the tabs
const slideImages = [
  { id: 1, image: slideimg1, label: "Spring Collection" },
  { id: 2, image: slideimg2, label: "Summer Blooms" },
  { id: 3, image: slideimg3, label: "Exclusive Bouquets" },
  { id: 4, image: slideimg4, label: "Seasonal Specials" },
  { id: 5, image: slideimg1, label: "Wedding Flowers" },
  { id: 6, image: slideimg2, label: "Anniversary" },
  { id: 7, image: slideimg3, label: "Birthday Special" },
  { id: 8, image: slideimg4, label: "Festive Collection" }
];

export default function Home() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      {/* Hero Banner - Full Width */}
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ position: 'relative', width: '100%', height: '40vh', minHeight: 500 }}>
          <Box
            component="img"
            src={heroFlower}
            alt="Hero Flower"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }} />
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
            width: '100%',
            maxWidth: '1200px',
            padding: '0 20px'
          }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '1.1rem', md: '3rem' },
              fontWeight: 'bold',
              mb: 1,
              textShadow: '2px 2px 8px rgba(0,0,0,0.8)'
            }}>
              ANJU FLOWER SHOP
            </Typography>
            <Typography variant="h4" sx={{ 
              mb: 3,
              fontSize: { xs: '1.0rem', md: '1.3rem' },
              textShadow: '1px 1px 4px rgba(0,1,3,0.7)'
            }}>
              Fresh, Seasonal, Beautiful
            </Typography>
            <Typography variant="h5" sx={{ 
              mb: 4,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              textShadow: '1px 1px 4px rgba(0,0,0,0.7)'
            }}>
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              sx={{
                bgcolor: '#971243',
                color: 'white',
                px: 6,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: '50px',
                textTransform: 'uppercase',
                '&:hover': {
                  bgcolor: '#ef6694'
                }
              }}
              onClick={() => navigate('/flowerlist')} // ← CHANGED HERE
            >
              SHOP NOW
            </Button>
          </Box>
        </Box>
      </Box>
      
      {/* Flower Cards Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ 
          textAlign: 'center', 
          mb: 6,
          color: '#971243',
          fontSize: '2rem'
        }}>
          Featured Flowers
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 4,
          flexWrap: 'wrap' 
        }}>
          {featuredFlowers.map((flower) => (
            <Box 
              key={flower.id}
              sx={{
                width: 280,
                bgcolor: 'white',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 8px 24px rgba(151, 18, 67, 0.2)'
                }
              }}
            >
              <Box
                component="img"
                src={flower.image}
                alt={flower.name}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ 
                  color: '#971243',
                  fontWeight: 'bold',
                  mb: 1
                }}>
                  {flower.name}
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: '#666',
                  mb: 2,
                  minHeight: 40
                }}>
                  {flower.description}
                </Typography>
                <Typography variant="h5" sx={{ 
                  color: '#ef6694',
                  fontWeight: 'bold',
                  mb: 3
                }}>
                  {flower.price}
                </Typography>
                
                {/* CHANGED: View Details → SHOP NOW */}
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: '#971243',
                    borderColor: '#971243',
                    '&:hover': {
                      bgcolor: '#971243',
                      color: 'white'
                    }
                  }}
                  onClick={() => navigate('/flowerlist')} // ← CHANGED HERE
                >
                  SHOP NOW
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
      
      {/* Valentine's Day Promo Section */}
      <Box sx={{ 
        py: 4,
        textAlign: 'center',
        mt: 4,
        mb: 4,
        position: 'relative',
        overflow: 'hidden',
        height: 300
      }}>
        <Box
          component="img"
          src={pinkbanner}
          alt="Valentine's Day Background"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        />
        
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0, 10, 9, 0.2)',
          zIndex: 1
        }} />
        
        <Container sx={{ 
          position: 'relative', 
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant="h5" sx={{ 
            mb: 2,
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.8rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
          }}>
            10% Off Selected Flowers for Valentine's Day
          </Typography>
          
          <Typography variant="body1" sx={{ 
            mb: 3,
            color: 'white',
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6,
            fontSize: '1rem',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            Celebrate love with our exclusive Valentine's Day collection. Enjoy 10% off on selected bouquets.
          </Typography>
          
         <Button 
  variant="contained"
  size="medium"
  sx={{
    bgcolor: 'white',
    color: '#971243',
    px: 4,
    py: 1,
    fontSize: '0.9rem',
    fontWeight: 'bold',
    borderRadius: '30px',
    textTransform: 'uppercase',
    '&:hover': {
      bgcolor: '#ea80fc',
      color: '#971243'
    }
  }}
  onClick={() => navigate("/orders")}
>
  Order Now
</Button>

        </Container>
      </Box>

      {/* NEW: Image Gallery Tabs Section */}
      <Box sx={{ 
        py: 8,
        textAlign: 'center',
        bgcolor: '#f9f9f9'
      }}>
        <Container>
          <Typography variant="h3" sx={{ 
            mb: 2,
            color: '#971243',
            fontWeight: 'bold',
            fontSize: { xs: '1.8rem', md: '2.5rem' }
          }}>
            Our Flower Collections
          </Typography>
          
          <Typography variant="h6" sx={{ 
            mb: 6,
            color: '#666',
            fontSize: '1rem',
            letterSpacing: 1
          }}>
            Browse through our beautiful flower collections
          </Typography>
          
          {/* Scrollable Tabs with Images */}
          <Box sx={{ 
            width: '100%',
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            p: 3
          }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable flower collections tabs"
              sx={{
                mb: 4,
                '& .MuiTab-root': {
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  minHeight: 60,
                  color: '#666',
                  '&.Mui-selected': {
                    color: '#971243',
                    fontWeight: 'bold'
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#ef6694'
                }
              }}
            >
              {slideImages.map((item, index) => (
                <Tab 
                  key={item.id} 
                  label={item.label}
                  icon={
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.label}
                      sx={{
                        width: 80,
                        height: 60,
                        objectFit: 'cover',
                        borderRadius: 1,
                        mb: 1
                      }}
                    />
                  }
                  iconPosition="top"
                />
              ))}
            </Tabs>
            
            {/* Main Display for Selected Tab */}
            <Box sx={{ 
              width: '100%',
              height: 400,
              borderRadius: 2,
              overflow: 'hidden',
              position: 'relative'
            }}>
              <Box
                component="img"
                src={slideImages[tabValue].image}
                alt={slideImages[tabValue].label}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'rgba(151, 18, 67, 0.7)',
                color: 'white',
                p: 2,
                textAlign: 'center'
              }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {slideImages[tabValue].label}
                </Typography>
                <Typography variant="body2">
                  Click on tabs above to view different collections
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
