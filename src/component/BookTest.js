import { useEffect, useState } from "react";
import Services from "../Services/Services";
import TestTypes from "./TestTypes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function BookTest() {
  const navigate = useNavigate();
  const testCategory = useSelector((state) => state.testCategory.value);
  const [tests, setTests] = useState([]);
  const testIds = [];
  const userId = Cookies.get("userId");
  const isLoggedIn = Cookies.get("isLoggedIn");
  const [cartOrders, setCartOrders] = useState();
  let order_id;
  const getTestsByCatagory = () => {
    Services.getTestByTestType(testCategory)
      .then((res) => {
        setTests(res.data);
        //console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.message, { onClose: 100 });
      });
    // console.log(tests)
  };

  useEffect(() => {
    // console.log(testCategory);
    getTestsByCatagory();
    if (isLoggedIn) {
      getTestData();
    }
  }, [testCategory]);

  const NavigationHandler = (testName) => {
    navigate("/testDetails/" + testName);
  };

  //To handle user login
  const userLogInHandler = () => {
    toast.error("Please Login First", { onClose: 100 });

    navigate("/login");
  };

  //Making an array of Test id's to to check condition in conditional rendering
  cartOrders &&
    cartOrders.tests.map((test) => {
      testIds.push(test.testId);
    });

  /*Add to cart function*/
  const AddToCartHandler = async (id) => {
    if (!isLoggedIn) {
      userLogInHandler();
    } else {
      const booking = {
        user: { userId: userId },
        tests: [{ testId: id }],
      };
      // console.log(booking);
      //function call to add order to cart....
      await Services.addOrderToCart(booking)
        .then((res) => {
          getTestsByCatagory();
          getTestData();
          toast.success(res.data, { onClose: 100 });
          // alert(res.data);
        })
        .catch((err) => {
          toast.error(err.message, { onClose: 100 });
          // alert(err.message);
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
            getTestsByCatagory();
            getTestData();
            toast.success(res.data, { onClose: 100 });
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
    <div className="container mt-2 rounded Test">
      <div className="row">
        <div className="col-2 border p-2">
          <TestTypes />
        </div>
        <div className="col-10 ">
          <div className="row">
            {tests &&
              tests.map((test) => (
                <div
                  className="product-cart  bk-test rounded col-3 mt-3"
                  key={test.testId}
                >
                  <div onClick={() => NavigationHandler(test.testName)}>
                    <div className="img">
                      <img
                        className="img-fluid"
                        src={`Files/TestImage/${test.testImagePath}`}
                        alt="default"
                      />
                    </div>
                    <div className="title mt-3 text-center">
                      <h6>{test.testName}</h6>
                    </div>
                    <div className="price">
                      <span className="off">{test.discount}% off</span>
                      <span className="dis-price">
                        {test.finalPrice}{" "}
                        <del className="actual-price">{test.actualPrice}</del>
                      </span>
                    </div>
                  </div>
                  <div className="action-btn mt-3 ">
                    {/* Conditonal rendering of buttons */}
                    {!testIds.includes(test.testId) ? (
                      <button
                        className="card"
                        onClick={() => AddToCartHandler(test.testId)}
                      >
                        Add to cart
                      </button>
                    ) : (
                      <button
                        className="card btn btn-danger "
                        onClick={() => RemoveFromCartHandler(test.testId)}
                      >
                        Remove
                      </button>
                    )}
                    {/* Conditonal rendering of buttons */}
                    <button
                      className="buy"
                      onClick={() => paymentHandler(test.testId)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
