import React, { useState } from "react";
import Services from "../Services/Services";
import { useNavigate, useParams } from "react-router-dom";

export default function Otp() {
  const { email } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const handleVerification = async () => {
    const response = await Services.verifyUser({ email, otp });
    if (response.data === "OTPVERIFIED") {
      navigate("/login");
    } else alert(response.data);
  };
  const handleReGernarateOtp = () => {
    const formData = new FormData();
    formData.append("email", email);
    const response = Services.reGenerateOTP(formData);
    alert(response.data);
  };
  return (
    <div className="container mt-4 p-lg-5   rounded bg-white">
      <div className="otp-container">
        <h2 className="text-center mt-2">Please verify OTP</h2>
        <div className="input-icons ">
          <i className="mdi mdi-lock" />
          <input
            className="input-field"
            type="email"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <small className="fw-light text-secondary">
          OTP will be expire in 1 min
        </small>
        <div className="row">
          <div className="col-md-6 mt-3">
            <button
              className="btn btn-primary container "
              type="submit"
              value="submit"
              onClick={handleVerification}
            >
              Verify OTP
            </button>
          </div>
          <div className="col-md-6 mt-3">
            <button
              className="btn btn-outline-primary container"
              onClick={handleReGernarateOtp}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
