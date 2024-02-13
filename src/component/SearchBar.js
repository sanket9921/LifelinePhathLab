import React from "react";
import { Link } from "react-router-dom";

export default function SearchBar() {
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
          <Link to="/login">
            <div className="cart">
              <i className="icofont-user" />
              <div className="secondary-text">Sign in</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
