import Cookies from "js-cookie";
import React from "react";
import Services from "../Services/Services";

export default function AddToCart(props) {
  const cartHandler = () => {
    const { id } = props;
    // console.log(id);
    const storedUserId = Cookies.get("userId");
    const booking = {
      user: { userId: storedUserId },
      tests: [{ testId: id }],
    };
    // console.log(booking);
    Services.bookOrder(booking)
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <button className="card handler" onClick={cartHandler}>
        Add to cart
      </button>
    </div>
  );
}
