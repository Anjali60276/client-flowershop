import React, { useEffect, useState, useContext } from "react";
import { Container, Typography, Paper, Box, Button, CircularProgress, Alert } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../ContextProvider";

export default function OrderPage() {
  const { id } = useParams();                 // from route /orders/:id
  const { host } = useContext(UserContext);
  const baseHost = (host || "").replace(/\/+$/, "");
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAuthHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("userToken");
    return token ? { headers: { "auth-token": token } } : null;
  };

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError("");

      if (!id || id === ":id") {
        setError("Invalid order id in URL. Please open the order from your Orders list.");
        setLoading(false);
        return;
      }

      try {
        const auth = getAuthHeader();
        if (!auth) {
          setError("Please login to view order details.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${baseHost}/api/order/GetOrderById/${id}`, auth);
        setOrder(res?.data?.order ?? null);
      } catch (err) {
        console.error("Error fetching order:", err);
        const msg = err?.response?.data?.message || err.message || "Failed to load order details.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, host, baseHost]);

  // 🔽 RETURN ORDER FUNCTION
  const handleReturn = async () => {
    if (!window.confirm("Do you want to return this order?")) return;

    try {
      const auth = getAuthHeader();
      if (!auth) {
        setError("Please login to return orders.");
        return;
      }

      await axios.put(
        `${baseHost}/api/order/ReturnOrder/${id}`,
        {},
        auth
      );

      alert("Return request submitted successfully.");

      // ✅ Mark order as returned to remove from OrderStatus list
      localStorage.setItem("orderReturned", id);

      navigate("/orders");
    } catch (err) {
      console.error("Error returning order:", err);
      setError(err?.response?.data?.message || "Failed to return order.");
    }
  };

  if (loading) return <Container sx={{ py: 6, textAlign: "center" }}><CircularProgress /></Container>;
  if (error && !order) return <Container sx={{ py: 6 }}><Alert severity="error">{error}</Alert></Container>;
  if (!order) return <Container sx={{ py: 6 }}><Typography>Order not found.</Typography></Container>;

  return (
    <Container sx={{ py: 4 }}>
      <Button variant="text" onClick={() => navigate("/orders")} sx={{ mb: 2 }}>
        ← Back to Orders
      </Button>

      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h6">Order #{order._id}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Date: {new Date(order.orderDate).toLocaleString()} — Status: {order.status}
            </Typography>
          </Box>

          <Box>
            {/* ✅ ONLY RETURN ORDER BUTTON */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleReturn}
            >
              Return Order
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Items</Typography>
          <Box sx={{ pl: 1 }}>
            {(order.items || []).map((it, i) => (
              <Typography key={i}>
                {it.quantity} x {it.productName ?? it.productId?.pname ?? "Item"} — ₹{it.price}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Shipping</Typography>
          <Typography>{order.shippingName ?? ""}</Typography>
          <Typography>{order.shippingAddress}</Typography>
          <Typography>Phone: {order.phone}</Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Total: ₹{order.totalAmount ?? 0}</Typography>
        </Box>
      </Paper>
    </Container>
  );
}
