import React, { useEffect, useState } from "react";
import Services from "../Services/Services";
import { useNavigate } from "react-router-dom";
import AddToCart from "./AddToCart";
import Cookies from "js-cookie";

export default function BestOffers() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [btnHandler, setBtnHandler] = useState(false);
  const [cartOrders, setCartOrders] = useState();
  const userId = Cookies.get("userId");

  useEffect(() => {
    Services.getBestOffers()
      .then((res) => {
        setOffers(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });

    getTestData();
  }, []);

  console.log(typeof cartOrders);
  const NavigationHandler = (testName) => {
    navigate("/testDetails/" + testName);
  };

  /*Add to cart*/

  const AddToCartHandler = (id) => {
    const booking = {
      user: { userId: userId },
      tests: [{ testId: id }],
    };
    // console.log(booking);
    Services.bookOrder(booking)
      .then((res) => {
        setBtnHandler(false);
        alert(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  /*Add to cart*/

  /*delete button*/

  const getTestData = async () => {
    await Services.getCartOrdersByUserId(userId).then((res) => {
      setCartOrders(res.data);
    });
  };

  const RemoveHandler = (testid) => {
    cartOrders.forEach((cartOrder) => {
      if (cartOrder.tests[0].testId === testid) {
        Services.deleteCartOrderById(cartOrder.id)
          .then((res) => {
            setBtnHandler(true);
            alert(res.data);
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
                {true ? (
                  <button
                    className="card"
                    onClick={() => AddToCartHandler(offer.testId)}
                  >
                    Add to cart
                  </button>
                ) : (
                  <button
                    className="card"
                    onClick={() => RemoveHandler(offer.testId)}
                  >
                    Remove
                  </button>
                )}
                <button className="buy">Buy Now</button>
              </div>
            </div>
          ))}
        {/* ======================================= */}
      </div>
    </div>
  );
}
