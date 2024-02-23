import { useEffect, useState } from "react";
import Services from "../Services/Services";
import TestTypes from "./TestTypes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function BookTest() {
  const navigate = useNavigate();
  const testCategory = useSelector((state) => state.testCategory.value);
  const [tests, setTests] = useState([]);
  const testIds = [];
  const userId = Cookies.get("userId");
  const [cartOrders, setCartOrders] = useState([]);

  const getTestsByCatagory = () => {
    Services.getTestByTestType(testCategory)
      .then((res) => {
        setTests(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
    // console.log(tests)
  };

  useEffect(() => {
    // console.log(testCategory);
    getTestsByCatagory();
    getTestData();
  }, [testCategory]);

  const NavigationHandler = (testName) => {
    navigate("/testDetails/" + testName);
  };

  //Making an array of Test id's to to check condition in conditional rendering
  cartOrders &&
    cartOrders.map((cartOrder) => {
      testIds.push(cartOrder.tests[0].testId);
    });

  /*Add to cart function*/
  const AddToCartHandler = (id) => {
    const booking = {
      user: { userId: userId },
      tests: [{ testId: id }],
    };
    // console.log(booking);
    //function call to add order to cart....
    Services.addOrderToCart(booking)
      .then((res) => {
        getTestsByCatagory();
        getTestData();
        // alert(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
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
    cartOrders.forEach((cartOrder) => {
      if (cartOrder.tests[0].testId === testid) {
        Services.deleteCartOrderById(cartOrder.id)
          .then((res) => {
            getTestsByCatagory();
            getTestData();
            // alert(res.data);
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    });
  };
  /*Remove From Cart*/

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
                      <h4>{test.testName}</h4>
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
                    <button className="buy">Buy Now</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
