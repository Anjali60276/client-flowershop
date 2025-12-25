import React from "react";
import Header from "../UserComponents/Header.jsx";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
