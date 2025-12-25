// client/src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminRouter from "./Modules/Admin/AdminRouter/AdminRouter";
import UserRouter from "./Modules/User/UserRouter/UserRouter";

// Top-level router:
//  - admin area mounted at /admin/*
//  - user area mounted at /*
export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="/*" element={<UserRouter />} />
    </Routes>
  );
}
