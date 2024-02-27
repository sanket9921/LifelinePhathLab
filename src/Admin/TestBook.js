import React, { useEffect, useState } from "react";
import OrderFilter from "./OrderFilter";
import { useSelector } from "react-redux";
import Services from "../Services/Services";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function TestBook() {
  const orderStatus = useSelector((state) => state.OrderStatus.value);
  const [orders, setOrders] = useState([]);
  const getOrdersByStatus = () => {
    console.log(orderStatus);
    Services.getOrdersByOrderStatus(orderStatus)
      .then((res) => {
        setOrders(res.data);
        //console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.message, { onClose: 100 });
      });
  };

  useEffect(() => {
    getOrdersByStatus();
  }, [orderStatus]);

  return (
    <>
      <div class="col-12 col-xl-8 mb-4 mb-xl-0">
        <h3 class="font-weight-bold">Tests Bookings</h3>
      </div>
      <div class="dropdown mb-4 ms-4 mt-4">
        <OrderFilter />
      </div>
      <div className="card p-3 mt-2">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>OrderId</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Test</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Upload Report</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order?.id}</td>
                    <td>
                      {order?.user?.firstName} {order?.user?.lastName}
                    </td>
                    <td>{order?.date}</td>
                    <td>{order?.tests[0]?.testType}</td>
                    <td>{order?.totalAmount}</td>
                    <td>{order?.status}</td>
                    <td>
                      <Link
                        class=" btn btn-outline-primary"
                        to={"/uploadReport/" + order.id}
                      >
                        Upload Report
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
