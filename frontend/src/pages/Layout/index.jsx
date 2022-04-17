import React from "react";
import Navbar from "../../components/Navbar";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Layout;