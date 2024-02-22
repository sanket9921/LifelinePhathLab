import React, { useEffect, useState } from "react";
import Services from "../Services/Services";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function BestOffers() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [cartOrders, setCartOrders] = useState();
  const testIds = [];
  const userId = Cookies.get("userId");

  useEffect(() => {
    fetchBestOffers();
    getTestData();
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

  //Making an array of Test id's to to check condition in conditional rendering
  cartOrders &&
    cartOrders.map((cartOrder) => {
      testIds.push(cartOrder.tests[0].testId);
    });

  // console.log(testIds);
  // console.log(testIds.includes(9));

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
        ///alert(res.data);
        toast.success(res.data,{onClose:100});
        fetchBestOffers();
        getTestData();
        // alert(res.data);
      })
      .catch((err) => {
        //alert(err.message);
        toast.error(err.message,{onClose:100});
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
            fetchBestOffers();
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
    <div className="container mt-3 rounded Test">
      <h3 className="text-center">Best Offers</h3>
      <div className="row">
        {/* ===================================== */}
        {offers &&
          offers.map((offer) => (
            <div className="product-cart rounded bk-test col-md-3 col-xs-6 mt-3">
              <div onClick={() => NavigationHandler(offer.testName)}>
                <div className="img">
                  <img
                    className="img-fluid"
                    src={`Files/TestImage/${offer.testImagePath}`}
                    alt=""
                  />
                </div>
                <div className="title mt-3 text-center">
                  <h6>{offer.testType}</h6>
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
                    className="card btn btn-danger "
                    onClick={() => RemoveFromCartHandler(offer.testId)}
                  >
                    Remove
                  </button>
                )}
                {/* Conditonal rendering of buttons */}
                <button className="buy">Buy Now</button>
              </div>
            </div>
          ))}
        {/* ======================================= */}
      </div>
    </div>
  );
}
