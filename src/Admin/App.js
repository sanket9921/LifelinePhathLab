import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <div className="container mt-3">
          <Outlet />
        </div>
      </Provider>
    </>
  );
}

export default App;
