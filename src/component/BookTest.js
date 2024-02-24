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
    navigate("/login");
  };

  //Making an array of Test id's to to check condition in conditional rendering
  cartOrders &&
    cartOrders.tests.map((test) => {
      testIds.push(test.testId);
    });

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
          getTestsByCatagory();
          getTestData();
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
            toast.success(res.data, { onClose: 100 });
            getTestsByCatagory();
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

