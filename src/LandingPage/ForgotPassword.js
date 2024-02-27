import React, { useState } from "react";
import Services from "../Services/Services";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState();

  const handleReGernarateOtp = () => {
    const formData = new FormData();
    formData.append("email", email);
    Services.reGenerateOTP(formData).then((response) => {
      toast.success(response.data, { onClose: 100 });
    });
  };

  const handleResetPassword = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("otp", otp);

    Services.resetPassword(formData).then((response) => {
      if (response.data == "PASSWORDRESETED") {
        navigate("/login");
      } else {
        alert(response.data);
      }
    });
  };

  return (
    <div className="container mt-4 p-lg-5   rounded bg-white">
      <div className="otp-container">
        <h2 className="text-center mt-2">Please Enter Your Email</h2>
        <div className="input-icons ">
          <i className="mdi mdi-email" />
          <input
            className="input-field"
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="row">
          <div className="col-md-7 mt-3">
            <div className="input-icons ">
              <i className="mdi mdi-lock" />
              <input
                className="input-field"
                type="text"
                placeholder="Enter the OTP"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-md-5 mt-4">
            <div
              className="btn btn-primary container"
              onClick={handleReGernarateOtp}
            >
              Send OTP
            </div>
          </div>
          <small className="fw-light text-secondary">
            OTP will be expire in 5 min
          </small>
          <div className="input-icons ">
            <i className="mdi mdi-lock" />
            <input
              className="input-field"
              type="email"
              placeholder="Enter New Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="input-icons ">
            <i className="mdi mdi-lock" />
            <input
              className="input-field"
              type="email"
              placeholder="Confirm  Password"
            />
          </div>

          <div className="row mt-3">
            <div className="col-md-6">
              <div
                className="btn btn-primary container"
                onClick={handleResetPassword}
              >
                Reset Password
              </div>
            </div>
            <div className="col-md-6">
              <Link to="/login" className="btn btn-outline-primary container">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
