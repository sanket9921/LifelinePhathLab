import React, { useEffect, useState } from "react";
import Services from "../Services/Services";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

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
        // console.log(res.data);
        const calculatedTotalAmount = res.data?.tests?.reduce(
          (acc, cartOrder) => {
            return acc + cartOrder.actualPrice;
          },
          0
        );

        setTotalAmount(calculatedTotalAmount);
        const calculatedToBePaidAmount = res.data?.tests?.reduce(
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
    // toast.error("Please Login First", { onClose: 100 });

    navigate("/login");
  };

  // Razor payment method
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // const savePaymentToDb = async (razorpayRes, amount, orderId, status) => {
  //   const payment = {
  //     orderId: orderId,
  //     amount: amount,
  //     razorpayPaymentId: razorpayRes ? razorpayRes.razorpay_payment_id : null,
  //     razorpayOrderId: razorpayRes ? razorpayRes.razorpay_order_id : null,
  //     razorpaySignature: razorpayRes ? razorpayRes.razorpay_signature : null,
  //     paymentDateTime: "",
  //     status: status,
  //   };

  //   await axios.post("http://localhost:8082/api/payment", payment);
  // };

  const getOptionsObject = (order) => {
    const options = {
      key: "rzp_test_9L81H2RGT2jv78",
      amount: order.data.amount,
      currency: order.data.currency,
      name: "",
      image: "https://www.svgrepo.com/show/261072/rupee.svg",
      // description: "For Testing purpose",
      order_id: order.data.id,
      handler: async (res) => {
        alert(
          "Payment Successfull!",
          `Your Payment Id is : ${res.razorpay_payment_id}`,
          "success"
        );
        console.log("razorpay_payment_id = ", res.razorpay_payment_id);
        console.log("razorpay_order_id = ", res.razorpay_order_id);
        console.log("razorpay_signature = ", res.razorpay_signature);

        Services.updateOrderStatus(cartOrders.id);
        window.location.reload();
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "This is test note",
      },
      theme: {
        color: "#3399cc",
      },
    };
    return options;
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (cartOrders.length === 0) {
      toast.error("No cart items are available", { onClose: 100 });
      return;
    }

    // load razorpay checkout script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const order = await Services.createorder({
      order: cartOrders.id,
    });

    // const order = await axios.post(
    //   "http://localhost:8083/api/orders/create_order",
    //   {
    //     order: cartOrders.id,
    //   },
    //   {}
    // );

    if (order.data.status === "created") {
      console.log("Order Created ", order);
      const options = getOptionsObject(order);

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.log("******* Error Details Start *******");
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
        console.log("******* Error Details End *******");

        // savePaymentToDb(res, amount, order.data.id, "Failed");

        toast.error(
          "Oops Payment Failed!",
          `Error Description : ${response.error.description}`,
          "error"
        );
      });

      rzp.open();
    } else {
      toast.error("Oops Order Creation Failed!", "Check backend code", "error");
    }
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
            <button
              className="btn btn-primary mt-2 btn-block container"
              onClick={paymentHandler}
            >
              Proceed payment
            </button>
          </div>
        </div>
      </div>
      {/*  End Cart Section*/}
    </>
  );
}
