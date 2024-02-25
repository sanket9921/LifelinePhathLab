import React, { useState } from "react";
import Services from "../Services/Services";
import { toast } from "react-toastify";
export default function Contact() {
  const [name1, setName1] = useState("");
  const [contactNo1, setContactNo1] = useState("");
  const [email1, setEmail1] = useState("");
  const [message1, setMessage1] = useState("");

  const handleEnquiry = () => {
    const enquiry = {
      name: name1,
      contactNO: contactNo1,
      email: email1,
      message: message1,
    };

    Services.addEnquiry(enquiry)
      .then((res) => {
        // alert(res.data);
        toast.success(res.data, { onclose: 1000 });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        //alert(err.message);
        toast.error(err.message, { onclose: 1000 });
      });
  };

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
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3782.6174584148744!2d74.4854823751923!3d18.546181282552304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDMyJzQ2LjMiTiA3NMKwMjknMTcuMCJF!5e0!3m2!1sen!2sin!4v1708848040095!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
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
                onChange={(e) => setName1(e.target.value)}
              />
            </div>
            <div className="input-icons ">
              <i className="mdi mdi-cellphone" />
              <input
                className="input-field"
                type="text"
                placeholder="Enter Mobile Number"
                required
                onChange={(e) => setContactNo1(e.target.value)}
              />
            </div>
            <div className="input-icons ">
              <i className="mdi mdi-email" />
              <input
                className="input-field"
                type="email"
                placeholder="Enter Your E-mail Id"
                required
                onChange={(e) => setEmail1(e.target.value)}
              />
            </div>
          </div>
          <div className="col-sm-6 vl">
            <label>Write Your Query Here:</label>
            <br />
            <textarea
              class="text-box"
              onChange={(e) => setMessage1(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="col-sm-6 mt-3">
          <p className="ms-2">We will get back to you soon*</p>
          <button
            className="button login-btn"
            type="submit"
            value="submit"
            onClick={handleEnquiry}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
