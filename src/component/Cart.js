import React, { useEffect, useState } from "react";
import Services from "../Services/Services";
import Cookies from "js-cookie";

export default function Cart() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [toBePaidAmount, setToBePaidAmount] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [cartOrders, setCartOrders] = useState([]);
  const userId = Cookies.get("userId");
  const deleteHandler = (id) => {
    Services.deleteCartOrderById(id)
      .then((res) => {
        getTestData();
        // alert(res.data);
      })
      .catch((err) => {
        alert(err.data);
      });
  };

  const getTestData = () => {
    Services.getCartOrdersByUserId(userId).then((res) => {
      setCartOrders(res.data);
      const calculatedTotalAmount = res.data.reduce((acc, cartOrder) => {
        return acc + cartOrder.tests[0].actualPrice;
      }, 0);

      setTotalAmount(calculatedTotalAmount);

      const calculatedToBePaidAmount = res.data.reduce((acc, cartOrder) => {
        return acc + cartOrder.tests[0].finalPrice;
      }, 0);

      setToBePaidAmount(calculatedToBePaidAmount);

      setDiscountPrice(calculatedTotalAmount - calculatedToBePaidAmount);
    });
  };
  useEffect(() => {
    getTestData();
  }, []);

  return (
    <>
      {/* Start cart Section */}
      <div className="container mt-3 payment-cart">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h3 className="text-center">Order Overview</h3>
            <div className="container bg-white rounded mt-2 mb-2 p-4">
              {cartOrders &&
                cartOrders.map((cartOrder) => (
                  <>
                    <div key={cartOrder.id} className="row mt-3">
                      <div className="col-md-7">
                        <div className="">
                          <div className="primary-text">
                            {cartOrder.tests[0].testName}
                          </div>
                          <div className="secondary-text">
                            {cartOrder.tests[0].testDescription}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="text-end">
                          <span className="col-6 text-end text-primary fw-semibold">
                            {cartOrder.tests[0].discount}% off
                          </span>
                          <del className="col-6 ps-2 text-end text-danger fw-semibold">
                            ₹{cartOrder.tests[0].actualPrice}
                          </del>
                        </div>

                        <div className=" text-success text-end  fw-semibold">
                          ₹{cartOrder.tests[0].finalPrice}
                        </div>
                      </div>
                      <div className="col-2 text-end">
                        <div
                          onClick={() => deleteHandler(cartOrder.id)}
                          className="delete-item me-3"
                          style={{
                            fontSize: "32px",
                            color: "red",
                            cursor: "pointer",
                          }}
                        >
                          <i className="mdi mdi-delete"></i>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
            </div>
          </div>

          <div className="col-md-4 mx-auto">
            <h3 className="text-center">Amount to be paid</h3>
            <div className="rounded border amount">
              <div className="row">
                <div className="col-6">M.R.P Total</div>
                <div className="col-6">₹{totalAmount}</div>
              </div>
              <div className="row">
                <div className="col-6">Price Discount</div>
                <div className="col-6">₹{discountPrice}</div>
              </div>
              <hr />
              <div className="row total">
                <div className="col-6">TO BE PAID</div>
                <div className="col-6">₹{toBePaidAmount}</div>
              </div>
            </div>
            <button className="btn btn-primary mt-2 btn-block container">
              Proceed payment
            </button>
          </div>
        </div>
      </div>
      {/*  End Cart Section*/}
    </>
  );
}
