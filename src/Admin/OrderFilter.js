import React from "react";
import { useDispatch } from "react-redux";
import { sendOrderStatusData } from "../redux/reducers/orderStatusReducer";

export default function OrderFilter() {
  
  const dispatch = useDispatch();
  const dispatchOrderStatus = (data) => {
    dispatch(sendOrderStatusData(data));
  };

  return (
    <div>
      <div
        class="btn btn-light dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Select
      </div>
      <ul class="dropdown-menu">
        <li
          onClick={() => {
            dispatchOrderStatus("");
          }}
        >
          All
        </li>
        <li
          onClick={() => {
            dispatchOrderStatus("P");
          }}
        >
          Pending
        </li>
        <li
          onClick={() => {
            dispatchOrderStatus("COM");
          }}
        >
          Completed
        </li>
        <li
          onClick={() => {
            dispatchOrderStatus("CN");
          }}
        >
          Cancelled
        </li>
        <li
          onClick={() => {
            dispatchOrderStatus("AC");
          }}
        >
          Added To Cart
        </li>
      </ul>
    </div>
  );
}
