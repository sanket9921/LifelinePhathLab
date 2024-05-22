import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header() {
  const handleLogout = () => {
    // Clear all cookies
    Cookies.remove("jwtToken");
    Cookies.remove("username");
    Cookies.remove("firstName");
    Cookies.remove("userId");
    Cookies.remove("role");
    Cookies.remove("isLoggedIn");
    // Dispatch logout action

    window.location.reload();
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/">
          <div className="brand">
            <div className="logo">
              <img src="assests/icon/logo.png" />
            </div>
            <div className="brand-name">
              <h2>Lifeline</h2>
              <p>Clinical Laboratory</p>
            </div>
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-5">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/prescription">
                Schedule Appoitment
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
            <li className="nav-item">
              <h5 className="fw-light mt-2 ms-5">
                Welcome{" "}
                <span className="text-primary fw-lights">
                  {" "}
                  {Cookies.get("username")}
                </span>
              </h5>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
