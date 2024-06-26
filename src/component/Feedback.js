import React from "react";
import { useState } from "react";
import Services from "../Services/Services";
import { toast } from "react-toastify";
export default function Feedback() {
  const [clientName1, setClientName1] = useState("");
  const [contactNo1, setContactNo1] = useState("");
  const [feedback1, setFeedback1] = useState("");

  const handleFeedback = () => {
    const clientFeedback = {
      clientName: clientName1,
      contactNo: contactNo1,
      feedback: feedback1,
    };

    Services.addClientFeedback(clientFeedback)
      .then((res) => {
        //alert(res.data);
        toast.success(res.data, { onclose: 1000 });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        //alert(err.message);
        toast.error(err.message, { onclose: 1000 });
      });
  };

  return (
    <div class="container rounded feedback-post-container">
      <div class="row">
        <div className="col-sm-6">
          <h1>Leave Your Feedback Here</h1>
          <br />
          <div className="input-icons ">
            <i className="mdi mdi-account" />
            <input
              className="input-field"
              type="email/number"
              placeholder="Enter Your Name"
              onChange={(e) => setClientName1(e.target.value)}
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
          <br />
          <p>
            Thanks for your feedback. We're constantly trying to improve our
            services, so your input is valuable.
          </p>
        </div>
        <div className="col-sm-6 vl">
          <label>Write your feedback:</label>
          <br />
          <textarea
            class="text-box"
            onChange={(e) => setFeedback1(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="col-sm-6 mt-3">
        <button
          className="button login-btn"
          type="submit"
          value="submit"
          onClick={handleFeedback}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
