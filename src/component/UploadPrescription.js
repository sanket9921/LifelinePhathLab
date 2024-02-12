import React from "react";
import Form from "../Form.css";

export default function UploadPrescription() {
  return (
    <>
      <div className="container mt-3">
        <div className="col-4">
          <form className="form-control">
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input
                className="input-field"
                type="text"
                placeholder="enter Your Name"
                required=""
              />
            </div>
            <div className="input-icons ">
              <i className="fa fa-user icon" />
              <input
                className="input-field"
                type="number"
                placeholder="Enter the phone Number"
                required=""
              />
            </div>
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
                placeholder="First Name"
                required=""
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
