import React from "react";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";

export default function SearchBar() {
  const isLoggedIn = Cookies.get("isLoggedIn");

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
    <div className="container-fluid bg-white">
      <div className="search-field">
        <div className="search-items">
          <div className="input-icons ">
            <i className="icofont-search" />
            <input
              className="input-field"
              type="text"
              placeholder="Enter Test or Package Name"
              required=""
            />
          </div>

          <div className="search-btn pt-2">
            <button className="btn btn-primary" type="submit" value="submit">
              Search
            </button>
          </div>
        </div>
        <div className="cart-sign">
          <Link to="/cart">
            <div className="cart">
              <i className="icofont-cart" />
              <div className="secondary-text">cart</div>
            </div>
          </Link>

          <div className="cart">
            {isLoggedIn ? (
              <>
                <i className="icofont-user" />

                <div className="secondary-text">
                  <div class="dropdown">
                    <div
                      class="dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {Cookies.get("firstName")}
                    </div>
                    <ul class="dropdown-menu">
                      <li>
                        <button class="dropdown-item" type="button">
                          Prfile
                        </button>
                      </li>
                      <li>
                        <button
                          class="dropdown-item text-danger"
                          type="button"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/login">
                <i className="icofont-user" />
                <div className="secondary-text">Sign in</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
