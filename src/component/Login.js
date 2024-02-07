import React from "react";

export default function Login() {
  return (
    <div className="main-container">
      <form className="form-control">
        <div className="row">
          <div className="col-xl-6 col-12">
            <img src="LogIn_img_1.jpg" alt="Default" className="LogInImg" />
          </div>
          <div className="col-xl-6 col-12 vl">
            <h1>Please Log-in</h1>
            <br />
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input
                className="input-field"
                type="email"
                placeholder="Enter E-mail Address"
              />
            </div>
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input
                className="input-field"
                type="password"
                placeholder="Enter The Password"
                required=""
              />
            </div>
            <a href="#" className="forgotanchor">
              {" "}
              Forgot Password
            </a>
            <br />
            <br />
            <div className="Buttons-container">
              <button className="button login-btn" type="submit" value="submit">
                Log in
              </button>
              <br />
              Don't Have An Account?
              <br />
              <button className="button" type="submit" value="submit">
                Sign Up
              </button>
              <br />
              Or
              <br />
              <button
                className="button google-btn"
                type="submit"
                value="submit"
              >
                Sign In With Google
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
