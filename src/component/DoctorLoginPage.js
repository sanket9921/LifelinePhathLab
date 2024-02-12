import React from "react";

export default function DoctorLoginPage() {
  return (
    <div className="main-container">
      <form className="form-control">
        <div className="row login-container">
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
                type="email/number"
                placeholder="Enter E-mail/Mobile Number"
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
                Register
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
