import React from "react";
import TopBar from "./TopBar";
import "../vendors/mdi/css/materialdesignicons.min.css";
import { Link } from "react-router-dom";
import Topbar2 from "./Topbar2";

export default function Signup() {
  return (
    <>
      <Topbar2 />
      <div className="container mt-2">
        <form className="form-control p-5">
          <h3>Please Enter Your details</h3>
          <br />
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="input-icons ">
                <i className="mdi mdi-account" />
                <input
                  className="input-field"
                  type="text"
                  placeholder="First Name"
                  required=""
                />
              </div>

              <div className="input-icons ">
                <i className="mdi mdi-account" />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Last Name"
                  required=""
                />
              </div>
              <div className="input-icons ">
                <i className="mdi mdi-email-outline" />
                <input
                  className="input-field"
                  type="email"
                  placeholder="E-mail Address"
                />
              </div>
              <div className="input-icons ">
                <i className="mdi mdi-cellphone" />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Contact Number"
                  required=""
                />
              </div>
              <div className="input-icons ">
                <i className="mdi mdi-lock-outline" />
                <input
                  className="input-field"
                  type="password"
                  placeholder="Password"
                  required=""
                />
              </div>
              <div className="input-icons ">
                <i className="mdi mdi-lock-outline" />
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

              <div className="input-icons">
                <i className="mdi mdi-account-multiple" />
                <select
                  className="input-field"
                  name="SelectDoctors"
                  id="language"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Others</option>
                </select>
              </div>
              <div className="input-icons ">
                <i className="mdi mdi-water" />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Blood Group"
                />
              </div>
              <div className="input-icons ">
                <i className="icofont-location-pin" />
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
                Already Have An Account
                <Link to="/login" style={{ color: "blue" }}>
                  Click Here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
