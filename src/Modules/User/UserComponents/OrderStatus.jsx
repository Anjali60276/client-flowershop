import React, { useEffect, useState, useContext } from "react";
import { Container, Typography, List, ListItem, ListItemText, Button, Divider, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../ContextProvider";

export default function OrderStatus() {
  const { host } = useContext(UserContext);
  const baseHost = (host || "").replace(/\/+$/, "");
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const getAuthHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("userToken");
    return token ? { headers: { "auth-token": token } } : null;
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const auth = getAuthHeader();
      if (!auth) {
        setError("Please login to view orders.");
        setOrders([]);
        setLoading(false);
        return;
      }

      const res = await axios.get(`${baseHost}/api/order/GetUserOrders`, auth);
      // ✅ Filter out returned orders
      const activeOrders = res?.data?.orders?.filter(o => o.status !== "Returned") ?? [];
      setOrders(activeOrders);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ✅ Show last order placed success message
    const lastOrderPlaced = localStorage.getItem("orderPlacedSuccess");
    if (lastOrderPlaced) {
      setSuccessMsg("🎉 Your order was placed successfully!");
      localStorage.removeItem("orderPlacedSuccess");
    }

    // ✅ Remove returned order from list if redirected from OrderPage
    const returnedOrderId = localStorage.getItem("orderReturned");
    if (returnedOrderId) {
      setOrders(prev => prev.filter(o => o._id !== returnedOrderId));
      localStorage.removeItem("orderReturned");
    }

    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  if (loading) return <Container sx={{ py: 6, textAlign: "center" }}><CircularProgress /></Container>;
  if (error) return <Container sx={{ py: 6 }}><Alert severity="error">{error}</Alert></Container>;

  return (
    <Container sx={{ py: 4 }}>
      {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

      <Typography variant="h5" sx={{ mb: 2 }}>Your Orders</Typography>
      {(!orders || orders.length === 0) ? (
        <Typography>No orders yet.</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <React.Fragment key={order._id}>
              <ListItem>
                <ListItemText
                  primary={`Order #${order._id}`}
                  secondary={`Date: ${new Date(order.orderDate).toLocaleDateString()} — Total: ₹${order.totalAmount ?? 0} — Status: ${order.status}`}
                />
                <Button variant="contained" size="small" onClick={() => navigate(`/orders/${order._id}`)}>View Details</Button>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Container>
  );
}
