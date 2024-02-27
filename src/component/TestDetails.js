import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Services from "../Services/Services";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function TestDetails() {
  const { testName } = useParams();
  const navigate = useNavigate();
  const [testDetails, setTestDetails] = useState(null);
  const userId = Cookies.get("userId");
  const isLoggedIn = Cookies.get("isLoggedIn");
  const [cartOrders, setCartOrders] = useState();
  const testIds = [];
  let order_id;
  const fetchTestDetails = () => {
    Services.getTestByName(testName)
      .then((res) => {
        setTestDetails(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    fetchTestDetails();
    if (isLoggedIn) {
      getTestData();
    }
  }, []);

  //Making an array of Test id's to to check condition in conditional rendering
  cartOrders &&
    cartOrders.tests.map((test) => {
      testIds.push(test.testId);
    });

  //To handle user login
  const userLogInHandler = () => {
    navigate("/login");
  };

  /*Add to cart function*/
  const AddToCartHandler = (id) => {
    if (!isLoggedIn) {
      toast.error("Please Login First", { onClose: 100 });

      userLogInHandler();
    } else {
      const booking = {
        user: { userId: userId },
        tests: [{ testId: id }],
      };
      // console.log(booking);
      //function call to add order to cart....
      Services.addOrderToCart(booking)
        .then((res) => {
          toast.success(res.data, { onClose: 100 });
          fetchTestDetails();
          getTestData();
          // alert(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  /*Add to cart*/

  /*Remove from cart*/

  //To fecth cart orders of user
  const getTestData = () => {
    Services.getCartOrdersByUserId(userId).then((res) => {
      setCartOrders(res.data);
    });
  };

  //Function to remove order from cart
  const RemoveFromCartHandler = (testid) => {
    cartOrders.tests.forEach((cartOrder) => {
      if (cartOrder.testId === testid) {
        Services.deleteCartOrderById(cartOrders.id, cartOrder.testId)
          .then((res) => {
            toast.success(res.data, { onClose: 100 });
            fetchTestDetails();
            getTestData();
            // alert(res.data);
          })
          .catch((err) => {
            toast.error(err.message, { onClose: 100 });
          });
      }
    });
  };
  /*Remove From Cart*/

  // Razorpay implementation
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
      amount: order.amount,
      currency: order.currency,
      name: "",
      image: "https://www.svgrepo.com/show/261072/rupee.svg",
      // description: "For Testing purpose",
      order_id: order.id,
      handler: async (res) => {
        alert(
          "Payment Successfull!",
          `Your Payment Id is : ${res.razorpay_payment_id}`,
          "success"
        );
        console.log("razorpay_payment_id = ", res.razorpay_payment_id);
        console.log("razorpay_order_id = ", res.razorpay_order_id);
        console.log("razorpay_signature = ", res.razorpay_signature);

        Services.updateOrderStatus(order_id);
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

  const paymentHandler = async (testId) => {
    // e.preventDefault();

    if (!isLoggedIn) {
      toast.error("Please Login First", { onClose: 100 });
      navigate("/login");
      return;
    }
    // load razorpay checkout script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const response = await Services.createOrderByTest({
      userId: userId,
      testId: testId,
    });

    // console.log(response.data);
    const order = JSON.parse(response.data[0]);
    order_id = response.data[1];

    // const order = await axios.post(
    //   "http://localhost:8083/api/orders/create_order",
    //   {
    //     order: cartOrders.id,
    //   },
    //   {}
    // );

    if (order.status === "created") {
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

        alert(
          "Oops Payment Failed!",
          `Error Description : ${response.error.description}`,
          "error"
        );
      });

      rzp.open();
    } else {
      alert("Oops Order Creation Failed!", "Check backend code", "error");
    }
  };

  return (
    <div className="container rounded bg-white mt-3 p-5 test-details">
      <div className="text-center fw-semibold mt-3 mb-3">
        <h3>Test Details</h3>
      </div>

      {testDetails && (
        <>
          <div className="row">
            <div className="col-xl-6 col-sm-6">
              <div className="p-3">
                <img
                  width={"100%"}
                  src={`../Files/TestImage/${testDetails.testImagePath}`}
                  alt="Default"
                />
              </div>
            </div>
            <div className="col-xl-6 col-sm-6 p-5">
              <div className="row mt-1">
                <div className="col-6 fw-semibold">
                  <div>Test Name:</div>
                </div>
                <div className="col-6">{testDetails.testName}</div>
              </div>
              <div className="row mt-1">
                <div className="col-6 fw-semibold">
                  <div>Test Type:</div>
                </div>
                <div className="col-6">{testDetails.testType}</div>
              </div>
              <div className="row mt-1">
                <div className="col-6 fw-semibold">Description:</div>{" "}
                <div className="col-6"> {testDetails.testDescription}</div>
              </div>
              <div className="row mt-1">
                <div className="col-6 fw-semibold">Discount:</div>
                <div className="col-6 text-primary">
                  {testDetails.discount}% off{" "}
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-6 fw-semibold">Actual price:</div>
                <div className="col-6 text-danger fw-semibold">
                  <del>₹{testDetails.actualPrice}</del>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-6 fw-semibold">Actual price:</div>
                <div className="col-6 text-success fw-semibold">
                  ₹{testDetails.finalPrice}
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-6">
                  {/* <button className="container btn btn-primary">
                    Add to cart
                  </button> */}
                  {/* Conditonal rendering of buttons */}
                  {!testIds.includes(testDetails.testId) ? (
                    <button
                      className="container btn btn-primary"
                      onClick={() => AddToCartHandler(testDetails.testId)}
                    >
                      Add to cart
                    </button>
                  ) : (
                    <button
                      className="container btn btn-danger "
                      onClick={() => RemoveFromCartHandler(testDetails.testId)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="col-6">
                  <button
                    className="container btn btn-outline-primary"
                    onClick={() => paymentHandler(testDetails.testId)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
