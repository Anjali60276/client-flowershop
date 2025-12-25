import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UserContext } from "../../../ContextProvider";

const Checkout = () => {
  const { host } = useContext(UserContext);
  const baseHost = (host || "").replace(/\/+$/, "");
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loadingCart, setLoadingCart] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    instructions: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardInfo, setCardInfo] = useState({ number: "", name: "", expiry: "", cvv: "" });

  const getAuthHeader = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("userToken");
    return token ? { headers: { "auth-token": token } } : null;
  };

  const fetchCart = async () => {
    setLoadingCart(true);
    setError("");
    try {
      const auth = getAuthHeader();
      if (!auth) {
        setError("Please login to checkout.");
        setCart(null);
        setLoadingCart(false);
        return;
      }
      const res = await axios.get(`${baseHost}/api/cart/GetCart`, auth);
      setCart(res?.data?.cart ?? null);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to fetch cart");
      setCart(null);
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  const subtotal = (cart?.items ?? []).reduce((sum, it) => {
    const price = Number(it.price ?? it.productId?.pprice ?? 0);
    const qty = Number(it.quantity ?? 0);
    return sum + price * qty;
  }, 0);
  const deliveryFee = subtotal >= 500 || subtotal === 0 ? 0 : 50;
  const total = subtotal + deliveryFee;

  const validate = () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      setError("Your cart is empty.");
      return false;
    }
    const required = ["name", "phone", "address", "city", "state", "pincode"];
    for (const key of required) {
      if (!shipping[key] || shipping[key].toString().trim() === "") {
        setError("Please fill all required shipping fields.");
        return false;
      }
    }
    if (paymentMethod === "card") {
      const cardReq = ["number", "name", "expiry", "cvv"];
      for (const k of cardReq) {
        if (!cardInfo[k] || cardInfo[k].toString().trim() === "") {
          setError("Please fill in card details or choose Cash on Delivery.");
          return false;
        }
      }
    }
    setError("");
    return true;
  };

  const placeOrder = async () => {
    if (!validate()) return;

    setPlacingOrder(true);
    setError("");
    setSuccessMsg("");

    try {
      const auth = getAuthHeader();
      if (!auth) {
        setError("Please login to place order.");
        setPlacingOrder(false);
        return;
      }

      const orderPayload = {
        shipping,
        paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "Card",
      };

      const res = await axios.post(`${baseHost}/api/order/CreateOrder`, orderPayload, auth);

      setSuccessMsg(res?.data?.message ?? "Order placed successfully!");

      try {
        await axios.delete(`${baseHost}/api/cart/ClearCart`, auth);
      } catch (clearErr) {
        console.warn("Failed to clear cart after order:", clearErr);
      }

      // ✅ Added: set localStorage flag before navigation
      localStorage.setItem("orderPlacedSuccess", "true");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loadingCart) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress sx={{ color: "#971243" }} />
      </Box>
    );
  }

  if (error && !cart) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Checkout
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Shipping Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Full name" value={shipping.name} required fullWidth onChange={(e) => setShipping({ ...shipping, name: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email (optional)" value={shipping.email} fullWidth onChange={(e) => setShipping({ ...shipping, email: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Phone" value={shipping.phone} required fullWidth onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Address" value={shipping.address} required fullWidth multiline minRows={2} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="City" value={shipping.city} required fullWidth onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="State" value={shipping.state} required fullWidth onChange={(e) => setShipping({ ...shipping, state: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="Pincode" value={shipping.pincode} required fullWidth onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Country" value={shipping.country} fullWidth onChange={(e) => setShipping({ ...shipping, country: e.target.value })} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Delivery instructions (optional)" value={shipping.instructions} fullWidth multiline minRows={2} onChange={(e) => setShipping({ ...shipping, instructions: e.target.value })} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Payment</Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend">Choose payment method</FormLabel>
                <RadioGroup row value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                  <FormControlLabel value="card" control={<Radio />} label="Card (mock)" />
                </RadioGroup>
              </FormControl>

              {paymentMethod === "card" && (
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField label="Card number" value={cardInfo.number} fullWidth onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField label="Name on card" value={cardInfo.name} fullWidth onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })} />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField label="Expiry (MM/YY)" value={cardInfo.expiry} fullWidth onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })} />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField label="CVV" value={cardInfo.cvv} fullWidth onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })} />
                    </Grid>
                  </Grid>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                    Card fields are for demo only — integrate a real payment gateway for production.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ position: "sticky", top: 24 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Order Summary</Typography>
              <Divider sx={{ mb: 2 }} />

              {(cart?.items ?? []).map((it) => {
                const p = it.productId ?? {};
                return (
                  <Box key={it._id ?? p._id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">{p.pname ?? "Product"} x {it.quantity}</Typography>
                    <Typography variant="body2">₹{((it.price ?? p.pprice) * it.quantity).toFixed(2)}</Typography>
                  </Box>
                );
              })}

              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>₹{subtotal.toFixed(2)}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Delivery</Typography>
                <Typography>{deliveryFee === 0 ? "Free" : `₹${deliveryFee.toFixed(2)}`}</Typography>
              </Box>

              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography fontWeight="bold">Total</Typography>
                <Typography fontWeight="bold">₹{total.toFixed(2)}</Typography>
              </Box>

              <Button fullWidth variant="contained" onClick={placeOrder} sx={{ bgcolor: "#971243", py: 1.5, "&:hover": { bgcolor: "#ef6694" } }} disabled={placingOrder} startIcon={<ShoppingCartIcon />}>
                {placingOrder ? "Placing order..." : `Place order • ₹${total.toFixed(2)}`}
              </Button>

              <Button fullWidth variant="text" onClick={() => navigate("/flowerlist")} sx={{ mt: 1 }}>
                Continue shopping
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
