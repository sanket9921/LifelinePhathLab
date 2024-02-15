import React from "react";

export default function Contact() {
  return (
    <>
      <div className="container mt-2 pb-2 pt-2 bg-white rounded">
        <h3 className="ms-2 mt-2">Contact Details</h3>
        <div className="contact-details px-3 py-2">
          <div>
            <h4>Phone</h4>
            <p>123-456-7890</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>info@example.com</p>
          </div>
          <div>
            <h4>Address</h4>
            <p>123 Main Street, City, Country</p>
          </div>
        </div>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15556.70404177827!2d-122.41923662053645!3d37.774929522228654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580d466c0b3ef%3A0x4a501367f076adff!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1644681416449!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
      <div class="container rounded bg-white p-5">
        <div class="row">
          <div className="col-sm-6">
            <h1>Post Your Query Here</h1>
            <br />
            <div className="input-icons ">
              <i className="mdi mdi-account" />
              <input
                className="input-field"
                type="text"
                placeholder="Enter Your Name"
              />
            </div>
            <div className="input-icons ">
              <i className="mdi mdi-cellphone" />
              <input
                className="input-field"
                type="text"
                placeholder="Enter Mobile Number"
                required=""
              />
            </div>
            <div className="input-icons ">
              <i className="mdi mdi-email" />
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
    </>
  );
}
