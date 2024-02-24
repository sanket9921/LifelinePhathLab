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
                  <button className="container btn btn-outline-primary">
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
