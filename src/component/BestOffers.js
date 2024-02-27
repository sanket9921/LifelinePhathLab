import React, { useEffect, useState } from "react";
import Services from "../Services/Services";
import { json, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function BestOffers() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [cartOrders, setCartOrders] = useState();
  const testIds = [];
  const userId = Cookies.get("userId");
  const isLoggedIn = Cookies.get("isLoggedIn");
  let order_id;
  useEffect(() => {
    fetchBestOffers();
    if (isLoggedIn) {
      getTestData();
    }
  }, []);

  //To fetch best 5 offers on discount

  const fetchBestOffers = () => {
    Services.getBestOffers()
      .then((res) => {
        setOffers(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //To navigate to the detials page
  const NavigationHandler = (testName) => {
    navigate("/testDetails/" + testName);
  };

  //To handle user login
  const userLogInHandler = () => {
    navigate("/login");
  };

  //Making an array of Test id's to to check condition in conditional rendering
  cartOrders &&
    cartOrders.tests.map((test) => {
      testIds.push(test.testId);
    });

  // console.log(testIds);
  // console.log(testIds.includes(9));

  /*Add to cart function*/
  const AddToCartHandler = async (id) => {
    if (!isLoggedIn) {
      toast.error("Please Login First", { onClose: 100 });
      userLogInHandler();
    } else {
      const booking = {
        user: { userId: userId },
        tests: [{ testId: id }],
      };

      //function call to add order to cart....
      await Services.addOrderToCart(booking)
        .then((res) => {
          toast.success(res.data, { onClose: 100 });
          fetchBestOffers();
          getTestData();
        })
        .catch((err) => {
          toast.error(err.message, { onClose: 100 });
        });
    }
  };
  /*Add to cart*/

  /*Remove from cart*/

  //To fecth cart orders of user
  const getTestData = async () => {
    await Services.getCartOrdersByUserId(userId).then((res) => {
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
            fetchBestOffers();
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
        toast.success(
          "Payment Successfull!",
          `Your Payment Id is : ${res.razorpay_payment_id}`,
          "success",
          { onClose: 100 }
        );

        // alert(
        //   "Payment Successfull!",
        //   `Your Payment Id is : ${res.razorpay_payment_id}`,
        //   "success"
        // );
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

        toast.error(
          "Oops Payment Failed!",
          `Error Description : ${response.error.description}`,
          "error",
          { onclose: 100 }
        );
      });

      rzp.open();
    } else {
      alert("Oops Order Creation Failed!", "Check backend code", "error");
    }
  };

  return (
    <div className="container mt-3 rounded Test">
      <h3 className="text-center">Best Offers</h3>
      <div className="row">
        {/* ===================================== */}
        {offers &&
          offers.map((offer, index) => (
            <div
              className="product-cart rounded bk-test col-md-3 col-xs-6 mt-3"
              key={index}
            >
              <div onClick={() => NavigationHandler(offer.testName)}>
                <div className="img">
                  <img
                    className="img-fluid"
                    src={`Files/TestImage/${offer.testImagePath}`}
                    alt=""
                  />
                </div>
                <div className="title mt-3 text-center">
                  <h6>{offer.testName}</h6>
                </div>
                <div className="price">
                  <span className="off">{offer.discount}% off</span>
                  <span className="dis-price">
                    ₹{offer.finalPrice}{" "}
                    <del className="actual-price">₹{offer.actualPrice}</del>
                  </span>
                </div>
              </div>

              <div className="action-btn mt-3 ">
                {/* Conditonal rendering of buttons */}
                {!testIds.includes(offer.testId) ? (
                  <button
                    className="card"
                    onClick={() => AddToCartHandler(offer.testId)}
                  >
                    Add to cart
                  </button>
                ) : (
                  <button
                    className="card btn btn-danger  "
                    onClick={() => RemoveFromCartHandler(offer.testId)}
                  >
                    Remove
                  </button>
                )}
                {/* Conditonal rendering of buttons */}
                <button
                  className="buy"
                  onClick={() => paymentHandler(offer.testId)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        {/* ======================================= */}
      </div>
    </div>
  );
}
