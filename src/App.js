import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import TopBar from "./component/TopBar";
import SearchBar from "./component/SearchBar";

export default function App() {
  return (
    <>
      <TopBar />
      <Navbar />
      <SearchBar />
      <Outlet />
      <Footer />
    </>
  );
}
