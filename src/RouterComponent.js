// Router.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import AdminApp from "./Admin/AdminApp";
import Cookies from "js-cookie";

const getUserRole = () => {
  const role = Cookies.get("role");
  return role;
};

const RouterComponent = () => {
  const userRole = getUserRole();

  return (
    <Router>
      <Routes>
        {userRole === "ADMIN" ? (
          <Route path="/*" element={<AdminApp />} />
        ) : (
          <Route path="/*" element={<App />} />
        )}
      </Routes>
    </Router>
  );
};

export default RouterComponent;
