import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TestDetails() {
  const { testName } = useParams();
  const [testDetails, setTestDetails] = useState(null);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        console.log("Fetching test details for testName:", testName);
        const response = await axios.get(
          `http://localhost:8083/api/tests/testName/${testName}`
        );
        setTestDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching test details:", error);
      }
    };
    fetchTestDetails();
  }, [testName]);

  return (
    <div className="container rounded bg-white mt-3 mb-3 pb-4">
      <div className=" p-3 text-center test-head-text">Test Details</div>
      {testDetails && (
        <div>
          <div className="text-center">
            <img
              src={`../Files/TestImage/${testDetails.testImagePath}`}
              alt="Default"
            />
          </div>
          <div>
            <div className="title mt-3 text-center">
              <h4>{testDetails.testName}</h4>
            </div>
            <div className="test-desc-text">
              Description: {testDetails.testDescription}
            </div>
            <div className="action-btn-container">
              <div className="test-price mt-3">
                <span className="test-price-off">
                  {testDetails.discount}% off
                </span>
                <span className="test-dis-price">
                  ₹{testDetails.finalPrice}{" "}
                  <del>₹{testDetails.actualPrice}</del>
                </span>
              </div>
              <div className="action-btn-container">
                <div className="btn-cart-buy">
                  <button className="test-card-btn">Add to cart</button>
                  <button className="buy-btn">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
