import React from "react";

export default function Cart() {
  return (
    <>
      {/* Start cart Section */}
      <div className="container mt-3 payment-cart">
        <div className="col-9">
          <h3>Order Overview</h3>
          <div className="container rounded mt-2 mb-2 p-4 overview">
            <div className="test-item mt-3">
              <div className="item">
                <div className="primary-text">COMPLETE BLOOD COUNT; CBC</div>
                <div className="secondary-text">
                  20&nbsp;Parameter(s) Covered
                </div>
              </div>
              <div className="delete-item me-3">Delete</div>
            </div>
            <hr />
            <div className="test-item mt-3">
              <div className="item">
                <div className="primary-text">COMPLETE BLOOD COUNT; CBC</div>
                <div className="secondary-text">
                  20&nbsp;Parameter(s) Covered
                </div>
              </div>
              <div className="delete-item me-3">Delete</div>
            </div>
            <hr />
          </div>
        </div>
        <div className="col-3">
          <h3>Amount to be paid</h3>
          <div className="rounded border amount">
            <div className="row">
              <div className="col-6">M.R.P Total</div>
              <div className="col-6">₹900</div>
            </div>
            <div className="row">
              <div className="col-6">Price Discount</div>
              <div className="col-6">₹900</div>
            </div>
            <hr />
            <div className="row total">
              <div className="col-6">TO BE PAID</div>
              <div className="col-6">₹900</div>
            </div>
          </div>
          <button className="btn btn-primary mt-2">Proceed payment</button>
        </div>
      </div>
      {/*  End Cart Section*/}
    </>
  );
}
