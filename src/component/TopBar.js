import React from "react";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="top-bar">
      <Link to="/">
        <div className="brand">
          <div className="logo">
            <img src="assests/icon/logo.png" />
          </div>
          <div className="brand-name">
            <h1>Lifeline</h1>
            <p>Clinical Laboratory</p>
          </div>
        </div>
      </Link>
      <div className="contact">
        <div className="contact-info">
          <i className="icofont-ui-call" />
          <div className="info">
            <div className="primary-text">9921410715</div>
            <div className="secondary-text">lifelinepath@gmail.com</div>
          </div>
        </div>
        <div className="contact-info">
          <i className="icofont-location-pin" />
          <div className="info">
            <div className="primary-text">Lifeline clinical lab</div>
            <div className="secondary-text">
              A/p Mandavagan Pharata Pune 412211
            </div>
          </div>
        </div>
        <div className="contact-info">
          <i className="icofont-clock-time" />
          <div className="info">
            <div className="primary-text">9:00-18:00</div>
            <div className="secondary-text">Sunday - Saturday</div>
          </div>
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
  );
}
