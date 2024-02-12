import React from "react";

export default function Contact() {
  return (
    <div class="container rounded feedback-post-container">
      <div class="row">
        <div className="col-sm-6">
          <h1>Post Your Query Here</h1>
          <br />
          <div className="input-icons ">
            <i className="fa fa-user icon" />
            <input
              className="input-field"
              type="text"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="input-icons ">
            <i className="fa fa-user icon" />
            <input
              className="input-field"
              type="text"
              placeholder="Enter Mobile Number"
              required=""
            />
          </div>
          <div className="input-icons ">
            <i className="fa fa-user icon" />
            <input
              className="input-field"
              type="email"
              placeholder="Enter Your E-mail Id"
              required=""
            />
          </div>
        </div>
        <div className="col-sm-6 vl">
          <label>Write Your Query Here:</label>
          <br />
          <textarea class="text-box"></textarea>
        </div>
      </div>
      <div className="col-sm-6 mt-3">
        <p className="ms-2">We will get back to you soon*</p>
        <button className="button login-btn" type="submit" value="submit">
          Submit
        </button>
      </div>
    </div>
  );
}
