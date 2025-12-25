import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  IconButton,
  Divider
} from '@mui/material';
import EmojiNatureTwoToneIcon from '@mui/icons-material/EmojiNatureTwoTone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/flowerlist' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const policyLinks = [
    { label: 'Shipping & Returns', path: '/shipping' },
    { label: 'Store Policy', path: '/policy' },
    { label: 'Payment Methods', path: '/payment' },
    { label: 'FAQ', path: '/faq' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#2d2d2d',
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 8
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info Section */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: '#971243',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 1,
                  mr: 2
                }}
              >
                <EmojiNatureTwoToneIcon sx={{ fontSize: '2rem', color: 'white' }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Brush Script MT, cursive',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #ef6694, #f8bbd0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Flower Shop
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#bdbdbd', mb: 2 }}>
              Bringing nature's beauty to your doorstep. Fresh flowers delivered with love and care.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                sx={{ 
                  color: 'white', 
                  bgcolor: '#971243',
                  '&:hover': { bgcolor: '#ef6694' }
                }}
                size="small"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'white', 
                  bgcolor: '#971243',
                  '&:hover': { bgcolor: '#ef6694' }
                }}
                size="small"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'white', 
                  bgcolor: '#971243',
                  '&:hover': { bgcolor: '#ef6694' }
                }}
                size="small"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: 'white', 
                  bgcolor: '#971243',
                  '&:hover': { bgcolor: '#ef6694' }
                }}
                size="small"
              >
                <PinterestIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Menu Section */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                color: '#ef6694',
                fontWeight: 'bold'
              }}
            >
              Quick Menu
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  sx={{
                    color: '#bdbdbd',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#ef6694',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Policy Section */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                color: '#ef6694',
                fontWeight: 'bold'
              }}
            >
              Policy
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {policyLinks.map((link) => (
                <Link
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  sx={{
                    color: '#bdbdbd',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#ef6694',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Address Section */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                color: '#ef6694',
                fontWeight: 'bold'
              }}
            >
              Address
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <LocationOnIcon sx={{ color: '#ef6694', mr: 1, fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                  MG Road, Hampankatta<br />
                  Mangalore, Karnataka 575001
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ color: '#ef6694', mr: 1, fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                  +91 824 242 4242
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ color: '#ef6694', mr: 1, fontSize: '1.2rem' }} />
                <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                  info@flowershop.com
                </Typography>
              </Box>
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                mt: 2, 
                color: '#bdbdbd',
                fontWeight: 500
              }}
            >
              Follow Us
            </Typography>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 3, bgcolor: '#424242' }} />

        {/* Bottom Section */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" sx={{ color: '#bdbdbd', textAlign: 'center' }}>
            © {new Date().getFullYear()} Flower Shop. All rights reserved. Powered by FlowerTech
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              onClick={() => handleNavigation('/privacy')}
              sx={{
                color: '#bdbdbd',
                textDecoration: 'none',
                fontSize: '0.875rem',
                cursor: 'pointer',
                '&:hover': {
                  color: '#ef6694',
                  textDecoration: 'underline'
                }
              }}
            >
              Privacy Policy
            </Link>
            <Link
              onClick={() => handleNavigation('/terms')}
              sx={{
                color: '#bdbdbd',
                textDecoration: 'none',
                fontSize: '0.875rem',
                cursor: 'pointer',
                '&:hover': {
                  color: '#ef6694',
                  textDecoration: 'underline'
                }
              }}
            >
              Terms & Conditions
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;