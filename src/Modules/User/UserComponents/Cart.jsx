import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Breadcrumbs,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../ContextProvider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Cart = () => {
  const { host } = useContext(UserContext);
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAuthHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("userToken");
    return token ? { headers: { "auth-token": token } } : null;
  };

  const baseHost = (host || "").replace(/\/+$/, "");

  const fetchCart = async () => {
    setLoading(true);
    setError("");
    try {
      const auth = getAuthHeader();
      if (!auth) {
        setError("Please login to view your cart.");
        setCart(null);
        setLoading(false);
        return;
      }
      const res = await axios.get(`${baseHost}/api/cart/GetCart`, auth);
      setCart(res?.data?.cart ?? null);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to fetch cart");
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  const extractProductId = (item) => {
    if (!item) return "";
    if (typeof item === "string") return item;
    if (item.productId) return item.productId._id ?? item.productId;
    return item._id ?? "";
  };

  const updateItemQuantity = async (item, newQty) => {
    try {
      const productId = extractProductId(item);
      const auth = getAuthHeader();
      if (!auth) {
        alert("Please login to update your cart");
        navigate("/login");
        return;
      }
      await axios.put(`${baseHost}/api/cart/UpdateCartItem`, { productId, quantity: Number(newQty) }, auth);
      await fetchCart();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to update item");
    }
  };

  const removeItem = async (item) => {
    const productId = extractProductId(item);
    if (!productId) return;
    if (!window.confirm("Remove this item from cart?")) return;
    try {
      const auth = getAuthHeader();
      if (!auth) {
        alert("Please login to remove items");
        navigate("/login");
        return;
      }
      await axios.delete(`${baseHost}/api/cart/RemoveFromCart/${productId}`, auth);
      await fetchCart();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to remove item");
    }
  };

  const clearCart = async () => {
    if (!window.confirm("Are you sure you want to clear the cart?")) return;
    try {
      const auth = getAuthHeader();
      if (!auth) {
        alert("Please login to clear cart");
        navigate("/login");
        return;
      }
      await axios.delete(`${baseHost}/api/cart/ClearCart`, auth);
      await fetchCart();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to clear cart");
    }
  };

  const goToCheckout = () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      alert("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress sx={{ color: "#971243" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box textAlign="center" sx={{ py: 6 }}>
          <ShoppingCartIcon sx={{ fontSize: 64, color: "#971243", mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button variant="contained" onClick={() => navigate("/flowerlist")} sx={{ bgcolor: "#971243", "&:hover": { bgcolor: "#ef6694" } }}>
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  const subtotal = (cart.items || []).reduce((sum, it) => {
    const itemPrice = Number(it.price ?? it.productId?.pprice ?? 0);
    const qty = Number(it.quantity ?? 0);
    return sum + itemPrice * qty;
  }, 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs + small prev/next links */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/" sx={{ fontSize: 12 }}>
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/flowerlist" sx={{ fontSize: 12 }}>
            All Products
          </Link>
          <Typography color="text.primary" sx={{ fontSize: 12 }}>
            I'm a product
          </Typography>
        </Breadcrumbs>

        <Box sx={{ display: "flex", gap: 2, color: "text.secondary", fontSize: 12 }}>
          <Typography sx={{ cursor: "pointer" }} onClick={() => window.history.back()}>
            &lt; Prev
          </Typography>
          <Typography>|</Typography>
          <Typography sx={{ cursor: "pointer" }}>Next &gt;</Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Left column: items displayed one-by-one in product style */}
        <Grid item xs={12} md={8}>
          {cart.items.map((item, index) => {
            const product = item.productId ?? {};
            const productId = extractProductId(item) || `${product._id ?? index}`;
            const imgUrl = product.pimage ? `${baseHost}/uploads/${product.pimage}` : "https://via.placeholder.com/600x800?text=No+Image";
            const originalPrice = product.poriginalPrice ?? product.pmrp ?? null; // if exists

            return (
              <Box key={item._id ?? productId} sx={{ mb: 4 }}>
                <Grid container spacing={3}>
                  {/* Image - left */}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ borderRadius: 1, overflow: "hidden", border: "1px solid #eee" }}>
                      <CardMedia
                        component="img"
                        image={imgUrl}
                        alt={product.pname || "product"}
                        sx={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
                      />
                    </Box>
                  </Grid>

                  {/* Details - right */}
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Box>
                          <Typography variant="h5" fontWeight="bold">
                            {product.pname || "I'm a product"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                            SKU: 0002
                          </Typography>
                        </Box>

                        {/* delete button uses removeItem (prevents eslint unused warning) */}
                        <IconButton onClick={() => removeItem(item)} sx={{ color: "#971243" }}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Box>

                      {/* Price */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
                          ₹{(item.price ?? product.pprice ?? 0).toFixed(2)}
                        </Typography>
                        {originalPrice && (
                          <Typography sx={{ textDecoration: "line-through", color: "text.disabled" }}>
                            ₹{originalPrice}
                          </Typography>
                        )}
                      </Box>

                      {/* Quantity */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <Typography sx={{ mr: 1 }}>Quantity</Typography>
                        <IconButton
                          onClick={() => updateItemQuantity(item, Math.max(1, (item.quantity || 1) - 1))}
                          disabled={(item.quantity || 1) <= 1}
                          size="small"
                          sx={{ border: "1px solid #ddd", width: 32, height: 32 }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Box sx={{ width: 46, textAlign: "center", border: "1px solid #eee", borderRadius: 1, py: 0.5 }}>
                          <Typography>{item.quantity}</Typography>
                        </Box>
                        <IconButton
                          onClick={() => updateItemQuantity(item, (item.quantity || 1) + 1)}
                          size="small"
                          sx={{ border: "1px solid #ddd", width: 32, height: 32 }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      {/* Add to cart button */}
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          bgcolor: "#6a2230", // maroon-like
                          "&:hover": { bgcolor: "#7d2a3a" },
                          color: "#fff",
                          textTransform: "none",
                          py: 1.2,
                          mb: 2,
                        }}
                        onClick={() => {
                          alert("This product is already in your cart. Update quantity or go to checkout.");
                        }}
                      >
                        Add to Cart
                      </Button>

                      {/* Accordion product info */}
                      <Box>
                        <Accordion elevation={0} sx={{ borderBottom: "1px solid #eee" }}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Product Info</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography variant="body2" color="text.secondary">
                              {product.pdesc
                                ? product.pdesc
                                : "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions."}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion elevation={0} sx={{ borderBottom: "1px solid #eee" }}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Return & Refund Policy</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography variant="body2" color="text.secondary">
                              Returns accepted within 7 days. Product must be unused.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>

                        <Accordion elevation={0} sx={{ borderBottom: "1px solid #eee" }}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Shipping Info</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography variant="body2" color="text.secondary">
                              Free standard shipping on orders above ₹500.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </Box>

                      {/* Social icons */}
                      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                        <IconButton size="small" sx={{ color: "#333" }}>
                          <FacebookIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: "#333" }}>
                          <TwitterIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: "#333" }}>
                          <PinterestIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Full-width product description below (like your screenshot) */}
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      {product.pdesc
                        ? product.pdesc
                        : "I'm a product description. This is a great place to ‘sell’ your product and grab buyers' attention. Describe your product clearly and concisely. Use unique keywords. Write your own description instead of using manufacturers' copy."}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ mt: 3 }} />
              </Box>
            );
          })}
        </Grid>

        {/* Right column: Order Summary (sticky) */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: "sticky", top: 24 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>₹{subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Delivery</Typography>
                <Typography>₹{subtotal >= 500 ? "0.00" : "50.00"}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography fontWeight="bold">Total</Typography>
                <Typography fontWeight="bold">₹{(subtotal + (subtotal >= 500 ? 0 : 50)).toFixed(2)}</Typography>
              </Box>

              <Button fullWidth variant="contained" onClick={goToCheckout} sx={{ bgcolor: "#6a2230", py: 1.5, "&:hover": { bgcolor: "#7d2a3a" } }}>
                Checkout
              </Button>

              <Button fullWidth variant="outlined" onClick={clearCart} sx={{ mt: 2 }}>
                Clear Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
