import React from "react";

export default function Signup() {
  return (
    <div className="main-container">
      <form className="form-control">
        <h1>Please Enter Your details</h1>
        <br />
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input
                className="input-field"
                type="text"
                placeholder="First Name"
                required=""
              />
            </div>
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input
                className="input-field"
                type="text"
                placeholder="Last Name"
                required=""
              />
            </div>
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input
                className="input-field"
                type="email"
                placeholder="E-mail Address"
              />
            </div>
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input
                className="input-field"
                type="text"
                placeholder="Contact Number"
                required=""
              />
            </div>
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                required=""
              />
            </div>
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input
                className="input-field"
                type="password"
                placeholder="Confirm Password"
                required=""
              />
            </div>
          </div>
          <div className="col-md-6 col-12 vl">
            <div className="input-icons ">
              <input
                className="input-field"
                type="date"
                placeholder="Date Of Birth"
              />
            </div>
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input className="input-field" type="text" placeholder="Gender" />
            </div>
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input
                className="input-field"
                type="text"
                placeholder="Blood Group"
              />
            </div>
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input
                className="input-field"
                type="text"
                placeholder="Address"
              />
            </div>
            <br />
            <button className="button" type="submit" value="submit">
              <b>Sign Up</b>
            </button>
            <p className="redirect">
              Already Have An Account<a href="#"> Click Here</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
