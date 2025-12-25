// src/components/FlowerDetails.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../../ContextProvider";

const FlowerDetails = () => {
  const { host } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // helper to read token like Cart.jsx (support both keys)
  const getAuthHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("userToken");
    return token ? { headers: { "auth-token": token } } : null;
  };

  // safe base host (no trailing slash)
  const baseHost = (host || "").replace(/\/+$/, "");

  useEffect(() => {
    if (!id) {
      setError("No product id provided");
      setLoading(false);
      return;
    }
    fetchProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, host]);

  const fetchProductDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const url = `${baseHost}/api/product/GetproductById/${id}`;
      console.log("Fetching product:", url);
      // try route param first, fallback to query param
      let res;
      try {
        res = await axios.get(url);
      } catch (err) {
        console.warn("Route fetch failed, trying query param form", err?.message || err);
        res = await axios.get(`${baseHost}/api/product/GetproductById`, { params: { id } });
      }

      const data = res?.data;
      const fetched = data?.oneproduct ?? data?.product ?? data;
      if (!fetched) {
        throw new Error("Product not found in response");
      }

      setProduct(fetched);
      // set qty to 1 or available stock if zero/negative
      setQuantity(fetched.pqty > 0 ? 1 : 0);
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError(err?.response?.data?.message || "Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (type) => {
    // guard if product not loaded
    const maxQty = product?.pqty ?? 1;
    setQuantity((prev) => {
      if (type === "increase") return Math.min(prev + 1, maxQty);
      if (type === "decrease") return Math.max(prev - 1, 1);
      return prev;
    });
  };

  const addToCart = async () => {
    const auth = getAuthHeader();

    if (!auth) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (!product?._id) {
      alert("Product data is missing");
      return;
    }

    try {
      const url = `${baseHost}/api/cart/AddToCart`;
      console.log("AddToCart request:", { url, productId: product._id, quantity });
      await axios.post(url, { productId: product._id, quantity }, auth);
      alert("Product added to cart successfully!");
      navigate("/cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert(err?.response?.data?.message || "Failed to add product to cart");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress sx={{ color: "#971243" }} />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error || "Product not found"}</Alert>
      </Container>
    );
  }

  // Build image URL defensively
  const imageUrl = product.pimage ? `${baseHost}/uploads/${product.pimage}` : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/flowerlist")}
          sx={{ mb: 3, color: "#971243" }}
        >
          Back to Shop
        </Button>

        <Card sx={{ overflow: "hidden" }}>
          <Grid container>
            {/* Left: image (CardMedia like Cart items) */}
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={imageUrl}
                alt={product.pname || "product image"}
                sx={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 400 }}
              />
            </Grid>

            {/* Right: details */}
            <Grid item xs={12} md={6}>
              <CardContent sx={{ p: 4 }}>
                {/* Category badge */}
                {product.catid && (
                  <Chip
                    label={typeof product.catid === "string" ? product.catid : product.catid?.category_name ?? "Category"}
                    sx={{ bgcolor: "#f8bbd0", color: "#971243", fontWeight: "bold", mb: 2 }}
                  />
                )}

                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {product.pname}
                </Typography>

                <Typography variant="h5" sx={{ color: "#971243", mb: 3, fontWeight: "bold" }}>
                  ₹{product.pprice}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {product.pdesc}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Availability:</strong>{" "}
                    {product.pqty > 0 ? (
                      <span style={{ color: "green" }}>In Stock ({product.pqty} available)</span>
                    ) : (
                      <span style={{ color: "red" }}>Out of Stock</span>
                    )}
                  </Typography>
                </Box>

                {/* Quantity controls */}
                {product.pqty > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" fontWeight="bold" gutterBottom>
                      Quantity
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <IconButton
                        onClick={() => handleQuantityChange("decrease")}
                        disabled={quantity <= 1}
                        sx={{ border: "1px solid #971243", "&:hover": { bgcolor: "#f8bbd0" } }}
                      >
                        <RemoveIcon />
                      </IconButton>

                      <Typography variant="h6" sx={{ minWidth: "40px", textAlign: "center" }}>
                        {quantity}
                      </Typography>

                      <IconButton
                        onClick={() => handleQuantityChange("increase")}
                        disabled={quantity >= product.pqty}
                        sx={{ border: "1px solid #971243", "&:hover": { bgcolor: "#f8bbd0" } }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  onClick={addToCart}
                  disabled={product.pqty === 0}
                  sx={{
                    bgcolor: "#971243",
                    py: 1.5,
                    fontSize: "1.1rem",
                    "&:hover": { bgcolor: "#ef6694" },
                  }}
                >
                  {product.pqty === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>

                <Box sx={{ mt: 3, p: 2, bgcolor: "#f8bbd0", borderRadius: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    🚚 Free delivery on orders above ₹500
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    💐 Fresh flowers guaranteed
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    🔄 Easy returns within 24 hours
                  </Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default FlowerDetails;
