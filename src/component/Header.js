import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <>
      <div className="top-bar">
        <div className="brand">
          <div className="logo">
            <img src="assests/icon/logo.png" />
          </div>
          <div className="brand-name">
            <h1>Lifeline</h1>
            <p>Clinical Laboratory</p>
          </div>
        </div>
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
          <div className="cart">
            <i className="icofont-cart" />
            <div className="secondary-text">cart</div>
          </div>
          <div className="cart">
            <i className="icofont-user" />
            <div className="secondary-text">Sign in</div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
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
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/">
                  <div className="icon-holder me-5">
                    <div className="icon">
                      <i className="icofont-home" />
                    </div>
                    <span> home </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/bookTest">
                  <div className="icon-holder me-5">
                    <div className="icon">
                      <i className="icofont-laboratory" />
                    </div>
                    <span> Book Test </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/uploadPrescription">
                  <div className="icon-holder me-5">
                    <div className="icon">
                      <i className="icofont-upload-alt" />
                    </div>
                    <span> Upload Prescription </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/downloadReport">
                  <div className="icon-holder me-5">
                    <div className="icon">
                      <i className="icofont-download" />
                    </div>
                    <span> Download report </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact">
                  <div className="icon-holder me-5">
                    <div className="icon">
                      <i className="icofont-ui-call" />
                    </div>
                    <span className="menu-item"> Contact </span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
