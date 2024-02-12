import React from "react";

export default function DoctorRegistration() {
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
                placeholder="Enter Your Name"
                required=""
              />
            </div>
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input
                className="input-field"
                type="text"
                placeholder="Clinic Name"
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
                type="text"
                placeholder="Your Specialization"
              />
            </div>
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input
                className="input-field"
                type="text"
                placeholder="Total Experience"
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
            <div className="input-icons">
              <label className="doctor-licence-label">
                Upload Your Licence*
              </label>
              <i className="fa fa-user icon" />
              <input
                className="input-field file-upload"
                type="file"
                id="myfile "
                name="myfile"
                accept=".jpg, .jpeg, .png, .doc, .pdf "
                required=""
              />
            </div>
            <p className="file-upload-format">
              should be in .doc, .pdf, .jpeg, .jpg, .png format *
            </p>
            <button className="button" type="submit" value="submit">
              <b>Register</b>
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
