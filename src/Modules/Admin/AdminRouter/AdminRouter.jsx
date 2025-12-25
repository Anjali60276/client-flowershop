import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../AdminComponents/Dashboard";
import AddProduct from "../AdminComponents/AddProduct";
import ViewUser from "../AdminComponents/ViewUser";
import AddCategory from "../AdminComponents/AddCategory";
import ViewCategory from "../AdminComponents/ViewCategory";
import UpdateCategory from "../AdminComponents/UpdateCategory";
import ViewProduct from "../AdminComponents/ViewProduct";
import UpdateProduct from "../AdminComponents/UpdateProduct";
import ManageOrder from "../AdminComponents/ManageOrder";
import ClippedDrawer from "../AdminComponents/ClippedDrawer";
import AdminDrawer from "../AdminComponents/AdminDrawer";
import LoginAdmin from "../AdminComponents/LoginAdmin";

const AdminRouter = () => {
  return (
    <Routes>
      {/* Standalone login page */}
      <Route path="loginadmin" element={<LoginAdmin />} />

      {/* All routes wrapped inside ClippedDrawer */}
      <Route
        path="*"
        element={
          <ClippedDrawer>
            <Routes>
              <Route path="" element={<AdminDrawer />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="viewuser" element={<ViewUser />} />
              <Route path="addcategory" element={<AddCategory />} />
              <Route path="viewcategory" element={<ViewCategory />} />
              <Route path="updatecategory/:cid" element={<UpdateCategory />} />
              <Route path="viewproduct" element={<ViewProduct />} />
              <Route path="updateproduct/:pid" element={<UpdateProduct />} />
              <Route path="manageorder" element={<ManageOrder />} />
            </Routes>
          </ClippedDrawer>
        }
      />
    </Routes>
  );
};

export default AdminRouter;
