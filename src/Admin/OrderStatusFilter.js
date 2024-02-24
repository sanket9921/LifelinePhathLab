import React from "react";
import { useDispatch } from "react-redux";
import { sendOrderStatusData } from "../redux/reducers/orderStatusReducer";

export default function OrderStatusFilter() {
  const dispatch = useDispatch();
  const dispatchOrderStatus = (data) => {
    dispatch(sendOrderStatusData(data));
  };

  return (
    <div>
      <button
        class="btn btn-light dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Filter
      </button>
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
