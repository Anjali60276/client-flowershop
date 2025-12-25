import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../UserComponents/Home.jsx";
import Logout from "../UserComponents/Logout.jsx";
import Login from "../UserComponents/Login.jsx";
import Register from "../UserComponents/Register.jsx";
import FlowerList from "../UserComponents/FlowerList.jsx";
import FlowerDetails from "../UserComponents/FlowerDetails.jsx";
import Cart from "../UserComponents/Cart.jsx";
import '../../../App.css';
import Footer from "../UserComponents/Footer.jsx";
import Header from "../UserComponents/Header.jsx";
import Checkout from "../UserComponents/Checkout.jsx";
import OrderStatus from "../UserComponents/OrderStatus.jsx";
import OrderPage from "../UserComponents/OrderPage.jsx";
import Contact from "../UserComponents/Contact.jsx";



const UserRouter = () => {
  return (
    <>
      <Header/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/flowerlist" element={<FlowerList/>} />
        <Route path="/flowerdetails/:id" element={<FlowerDetails/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path= "/checkout" element={<Checkout/>} />
        <Route path="/orders" element={<OrderStatus />} />
    <Route path="/orders/:id" element={<OrderPage />} />
    <Route path = "/contact" element={<Contact/>}/>
   



        
      </Routes>
      <Footer/>
    </>
  );
};

export default UserRouter;

