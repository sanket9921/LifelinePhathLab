import React, { useEffect, useState } from "react";
import Services from "../Services/Services";
import Cookies from "js-cookie";

export default function DeleteFromCart(props) {
  const [cartOrders, setCartOrders] = useState();
  const userId = Cookies.get("userId");
  const { testid } = props;
  const getTestData = async () => {
    await Services.getCartOrdersByUserId(userId).then((res) => {
      setCartOrders(res.data);
    });
  };
  useEffect(() => {
    getTestData();
  }, []);

  const RemoveHandler = () => {
    cartOrders.forEach((cartOrder) => {
      if (cartOrder.tests[0].testId === testid) {
        Services.deleteCartOrderById(cartOrder.id)
          .then((res) => {
            alert(res.data);
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    });
  };

  return (
    <div>
      <button className="card handler" onClick={RemoveHandler}>
        Remove
      </button>
    </div>
  );
}
