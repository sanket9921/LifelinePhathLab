import React, { useState } from "react";
import "../mdi/css/materialdesignicons.min.css";
import { Link } from "react-router-dom";
import Services from "../Services/Services";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      // Perform login request to backend, get token
      const response = await Services.userLogin({ email, password });
      const data = response.data;
      toast.success(response.data.message, { onclose: 1000 });
      // Store token in cookie if login successful

      const { jwtToken, username, userId, role, firstName } = response.data;
      if (response.status === 200) {
        // Cookies.set(
        //   "UserData",
        //   { jwtToken, username, userId, role, firstName },
        //   { expires: 3 }
        // );

        Cookies.set("jwtToken", data.jwtToken);
        Cookies.set("username", data.username);
        Cookies.set("userId", data.userId);
        Cookies.set("role", data.role);
        Cookies.set("firstName", data.firstName);
        Cookies.set("isLoggedIn", true);

        // Set loggedIn to true to trigger redirection

        setLoggedIn(true);
      } else {
        // Handle login failure
        //setError(data.message);
        toast.error(data.message, { onclose: 1000 });
      }
    } catch (error) {
      // Handle network errors
      //setError("Network error. Please try again later.");
      toast.error("Wrong Password,Please try again later.", { onclose: 1000 });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  if (loggedIn) {
    // Redirect user to a different route after successful login
    window.location.href = "/";
  }

  return (
    <>
      <div className="container mt-2 text-center">
        <div className="form-control">
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
                  type="email"
                  placeholder="Enter E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-icons ">
                <i className="mdi mdi-lock" />
                <input
                  className="input-field"
                  type="password"
                  placeholder="Enter The Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required=""
                />
              </div>
              <br />

              <Link
                to={"/fotgotPassword"}
                style={{
                  textDecoration: "underline",
                  color: "blue",
                  textAlign: "center",
                }}
                className="forgotanchor"
              >
                Forgot Password
              </Link>
              <div className="Buttons-container">
                <button
                  className="button login-btn"
                  type="submit"
                  value="submit"
                  onClick={handleLogin}
                >
                  Log in
                </button>
                {error && <p>{error}</p>}
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

              <p className="mt-2">
                Are you doctor?{" "}
                <Link to="/doctorResister" className="text-primary">
                  Tie up with us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
