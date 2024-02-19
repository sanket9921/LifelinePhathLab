import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import TopBar from "./component/TopBar";
import SearchBar from "./component/SearchBar";
import { Provider } from "react-redux";
import store from "./redux/store";
import TestDetails from "./component/TestDetails";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <TopBar />
        <Navbar />
        <SearchBar />
        <Outlet />
        {/* <TestDetails /> */}
        <Footer />
      </Provider>
    </>
  );
}
