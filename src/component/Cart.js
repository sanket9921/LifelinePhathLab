import React, { useEffect, useState } from "react";
import Services from "../Services/Services";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [toBePaidAmount, setToBePaidAmount] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [cartOrders, setCartOrders] = useState([]);
  const userId = Cookies.get("userId");
  const isLoggedIn = Cookies.get("isLoggedIn");

  //To remove from cart
  const deleteHandler = (id) => {
    Services.deleteCartOrderById(cartOrders.id, id)
      .then((res) => {
        getTestData();
        // alert(res.data);
      })
      .catch((err) => {
        alert(err.data);
      });
  };

  const getTestData = async () => {
    await Services.getCartOrdersByUserId(userId)
      .then((res) => {
        setCartOrders(res.data);
        const calculatedTotalAmount = res.data.tests.reduce(
          (acc, cartOrder) => {
            return acc + cartOrder.actualPrice;
          },
          0
        );

        setTotalAmount(calculatedTotalAmount);

        const calculatedToBePaidAmount = res.data.tests.reduce(
          (acc, cartOrder) => {
            return acc + cartOrder.finalPrice;
          },
          0
        );

        setToBePaidAmount(calculatedToBePaidAmount);
        setDiscountPrice(calculatedTotalAmount - calculatedToBePaidAmount);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  useEffect(() => {
    if (!isLoggedIn) {
      userLogInHandler();
    } else {
      getTestData();
    }
  }, []);

  //To handle user login
  const userLogInHandler = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Start cart Section */}
      <div className="container mt-3 payment-cart">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h3 className="text-center">Order Overview</h3>
            <div className="container bg-white rounded mt-2 mb-2 p-4">
              {cartOrders.tests &&
                cartOrders.tests.map((cartOrder) => (
                  <>
                    <div key={cartOrder.id} className="row mt-3">
                      <div className="col-md-7">
                        <div className="">
                          <div className="primary-text">
                            {cartOrder.testName}
                          </div>
                          <div className="secondary-text">
                            {cartOrder.testDescription}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="text-end">
                          <span className="col-6 text-end text-primary fw-semibold">
                            {cartOrder.discount}% off
                          </span>
                          <del className="col-6 ps-2 text-end text-danger fw-semibold">
                            ₹{cartOrder.actualPrice}
                          </del>
                        </div>

                        <div className=" text-success text-end  fw-semibold">
                          ₹{cartOrder.finalPrice}
                        </div>
                      </div>
                      <div className="col-2 text-end">
                        <div
                          onClick={() => deleteHandler(cartOrder.testId)}
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
