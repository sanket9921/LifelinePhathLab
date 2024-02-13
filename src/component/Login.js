import React from "react";
import TopBar from "./TopBar";
import "../vendors/mdi/css/materialdesignicons.min.css";
import { Link } from "react-router-dom";
import Topbar2 from "./Topbar2";
export default function Login() {
  return (
    <>
      <Topbar2 />
      <div className="container mt-2 text-center">
        <form className="form-control">
          <div className="row login-container">
            <div className="col-xl-6 col-12">
              <img
                src="assests/image/LogIn_img_1.jpg"
                alt="Default"
                className="LogInImg"
              />
            </div>
            <div className="col-xl-6 col-12 vl">
              <h3>Please Log-in</h3>
              <br />
              <button
                className="button google-btn"
                type="submit"
                value="submit"
              >
                Sign In With Google
              </button>
              <br />
              <br />

              <div className="input-icons ">
                <i className="mdi mdi-email-outline" />
                <input
                  className="input-field"
                  type="email/number"
                  placeholder="Enter E-mail/Mobile Number"
                />
              </div>

              <div className="input-icons ">
                <i className="mdi mdi-lock" />
                <input
                  className="input-field"
                  type="password"
                  placeholder="Enter The Password"
                  required=""
                />
              </div>
              <br />

              <a
                href="#"
                style={{
                  textDecoration: "underline",
                  color: "blue",
                  textAlign: "right",
                }}
                className="forgotanchor"
              >
                Forgot Password
              </a>
              <div className="Buttons-container">
                <button
                  className="button login-btn"
                  type="submit"
                  value="submit"
                >
                  Log in
                </button>
                <br />
                <br />
                Don't Have An Account?
                <br />
                <Link
                  to="/signup"
                  className="button"
                  type="submit"
                  value="submit"
                >
                  Sign Up
                </Link>
                <br />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
