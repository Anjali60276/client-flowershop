import React from "react";
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import EmojiNatureTwoToneIcon from "@mui/icons-material/EmojiNatureTwoTone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // State for mobile menu
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // auth state based on localStorage token
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    Boolean(localStorage.getItem("userToken"))
  );

  // Keep auth state in sync if localStorage changes in another tab
  React.useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "userToken") {
        setIsAuthenticated(Boolean(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Handle navigation
  const handleNavigation = (path) => {
    if (path === "home") {
      navigate("/");
    } else {
      navigate(`/${path}`);
    }
  };

  // Handle mobile menu open/close
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    if (path) handleNavigation(path);
  };

  // Handle user menu open/close
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (action) => {
    setAnchorElUser(null);

    if (action === "login") {
      navigate("/login");
      return;
    }
    if (action === "register") {
      navigate("/register");
      return;
    }
    if (action === "logout") {
      localStorage.removeItem("userToken");
      setIsAuthenticated(false);
      navigate("/");
      return;
    }
  };

  const menuItems = [
    { label: "Home", path: "home" },
    { label: "Shop", path: "flowerlist" },
    { label: "Contact", path: "contact" },
  ];

  return (
    <Box component="header">
      {/* Top Strip */}
      <Box sx={{ bgcolor: "#f8f9fa", py: 1 }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">
              Fresh blooms delivered daily - Order now for same-day delivery!
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                size="small"
                sx={{ color: "black", fontSize: "12px" }}
                onClick={() => navigate("/help")}
              >
                Help Center
              </Button>
              <Button
                size="small"
                sx={{ color: "black", fontSize: "12px" }}
                onClick={() => navigate("/orders")}
              >
                Order Status
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Navigation Bar */}
      <AppBar position="static" sx={{ bgcolor: "white", color: "black" }}>
        <Container>
          <Toolbar>
            {/* Mobile Menu Icon */}
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: 2 }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="mobile-menu"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="mobile-menu"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu()}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={() => handleCloseNavMenu(item.path)}
                  >
                    <Typography textAlign="center">{item.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
              <EmojiNatureTwoToneIcon
                sx={{ mr: 1, color: "#971243", fontSize: "2rem" }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Brush Script MT, cursive",
                  fontWeight: "bold",
                  fontSize: { xs: "1.5rem", md: "29px" },
                  background: "linear-gradient(45deg, #971243, #ef6694)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                onClick={() => navigate("/")}
              >
                FLOWER SHOP
              </Typography>
            </Box>

            {/* Navigation Buttons */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 2,
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 500,
                    "&:hover": {
                      bgcolor: "#f8bbd0",
                      color: "#971243",
                      transform: "scale(1.05)",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Cart Icon */}
            <IconButton
              color="inherit"
              sx={{ ml: 1 }}
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartIcon />
            </IconButton>

            {/* User Menu */}
            <IconButton
              color="inherit"
              sx={{ ml: 1 }}
              onClick={handleOpenUserMenu}
            >
              <PersonIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu()}
            >
              {!isAuthenticated && (
                <>
                  <MenuItem onClick={() => handleCloseUserMenu("login")}>
                    Login
                  </MenuItem>
                  <MenuItem onClick={() => handleCloseUserMenu("register")}>
                    Register
                  </MenuItem>
                </>
              )}
              {isAuthenticated && (
                <MenuItem onClick={() => handleCloseUserMenu("logout")}>
                  Logout
                </MenuItem>
              )}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
