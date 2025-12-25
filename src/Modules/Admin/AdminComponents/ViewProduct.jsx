import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Toolbar,
  Paper,
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../ContextProvider";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function ViewProduct() {
  const { host } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${host}/api/product/Getproduct`);
      const list = res.data.getproduct || res.data.products || [];
      setProducts(list);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/Admin/Updateproduct/${id}`);
  };

  const handleDeleteClick = (id) => {
    setToDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!toDeleteId) return;
    try {
      await axios.delete(`${host}/api/product/DeleteProduct/${toDeleteId}`);
      setConfirmOpen(false);
      setToDeleteId(null);
      fetchProducts();
      alert("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  const handleDeleteCancel = () => {
    setConfirmOpen(false);
    setToDeleteId(null);
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, ml: "150px" }}>
        <Toolbar />
        <Typography>Loading products...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, ml: "150px", mb: "90px" }}>
      <Toolbar />
      <Typography variant="h4" sx={{ mb: 3, color: "#971243", fontWeight: "bold" }}>
        View Products
      </Typography>

      {products.length === 0 ? (
        <Paper sx={{ p: 4 }}>
          <Typography>No products found.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {products.map((p) => {
            const categoryLabel =
              p.catid && typeof p.catid === "object"
                ? p.catid.category_name || p.catid._id
                : p.catid || "—";

            const isExpanded = expandedDescriptions[p._id];
            const needsReadMore = p.pdesc && p.pdesc.length > 100;

            return (
              <Grid item xs={5.5} sm={3.8} md={2.9} lg={2.3} key={p._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 8px 20px rgba(151, 18, 67, 0.25)",
                      bgcolor: "#fef5f8",
                    },
                    maxWidth: "260px",
                    margin: "0 auto",
                  }}
                >
                  {/* FIXED IMAGE CONTAINER */}
                  <Box
                    sx={{
                      width: "100%",
                      height: 140,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#f9f9f9",
                      borderRadius: "10px 10px 0 0",
                      overflow: "hidden",
                    }}
                  >
                    {p.pimage ? (
                      <img
                        src={`${host}/uploads/${p.pimage}`}
                        alt={p.pname}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      <Typography variant="caption" fontSize="0.8rem">No image</Typography>
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", p: 1.8, pt: 1.2, pb: 1.8 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ fontWeight: "bold", mb: 0.6, fontSize: "0.95rem", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.4 }}
                      >
                        {p.pname}
                      </Typography>

                      <Box sx={{ mb: 1.2 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            fontSize: "0.78rem",
                            lineHeight: 1.3,
                            display: "-webkit-box",
                            WebkitLineClamp: isExpanded ? "none" : 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {p.pdesc}
                        </Typography>
                        {needsReadMore && (
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.6 }}>
                            <IconButton size="small" onClick={() => toggleDescription(p._id)} sx={{ p: 0, fontSize: '0.72rem', color: '#971243', '&:hover': { backgroundColor: 'transparent' } }}>
                              {isExpanded ? (
                                <>
                                  Show less
                                  <ExpandLessIcon sx={{ fontSize: '0.95rem', ml: 0.6 }} />
                                </>
                              ) : (
                                <>
                                  Read more
                                  <ExpandMoreIcon sx={{ fontSize: '0.95rem', ml: 0.6 }} />
                                </>
                              )}
                            </IconButton>
                          </Box>
                        )}
                      </Box>

                      <Typography variant="body2" sx={{ fontWeight: "bold", color: "#971243", mb: 0.4, fontSize: "0.95rem" }}>
                        ₹{p.pprice}
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 0.4, fontSize: "0.78rem" }}>
                        Qty: {p.pqty}
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 1.2, fontSize: "0.78rem", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.3 }}>
                        {categoryLabel}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}>
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        onClick={() => handleUpdate(p._id)}
                        sx={{ bgcolor: "#971243", "&:hover": { bgcolor: "#ef6694" }, py: 0.5, fontSize: "0.85rem", minHeight: "32px" }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        color="error"
                        onClick={() => handleDeleteClick(p._id)}
                        sx={{ py: 0.5, fontSize: "0.85rem", minHeight: "32px", borderWidth: "1.5px", "&:hover": { borderWidth: "1.5px" } }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Dialog open={confirmOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
