import React, { useEffect, useState } from "react";
import Services from "../Services/Services";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allPatients, setALlPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const userName = Cookies.get("firstName");

  //console.log(userName);
  //To fetch today's appointments
  const appointmentsOfDay = () => {
    Services.getTodaysAppointments()
      .then((res) => {
        setTodaysAppointments(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //To fetch pending appointments
  const getPendingBookings = () => {
    Services.getPendingOrdersByOrderStatus()
      .then((res) => {
        setPendingBookings(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //To fetch total clients
  const fetchTotalPatients = () => {
    Services.getAllPatients()
      .then((res) => {
        setALlPatients(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //To fetch total doctors
  const fetchTotalDoctors = () => {
    Services.getAllDoctors()
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //To fetch orders count
  const fetchOrdersCount = () => {
    Services.getAllOrdersCount()
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    appointmentsOfDay();
    getPendingBookings();
    fetchOrdersCount();
    fetchTotalPatients();
    fetchTotalDoctors();
  }, []);

  return (
    <>
      <div class="col-12 col-xl-8 mb-2  mb-xl-0">
        <h3 class="font-weight-bold mt-5">Welcome {userName}</h3>
      </div>
      <div class="col-md-12 mt-5 grid-margin transparent">
        <div class="row">
          <div class="col-md-3 mb-4 stretch-card transparent">
            <div class="card bg-primary-subtle ">
              <div class="card-body">
                <p class="mb-4">Today’s Bookings</p>
                <p class="fs-30 text-center mb-2 fw-light h2">
                  00{todaysAppointments.length}
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-3 mb-4 stretch-card transparent">
            <div class="card bg-danger-subtle">
              <div class="card-body">
                <p class="mb-4">Total Bookings</p>
                <p class="fs-30 mb-2 text-center fw-light h2">
                  00{orders.length}
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-3 mb-4 stretch-card transparent">
            <div class="card bg-warning-subtle">
              <div class="card-body">
                <p class="mb-4">Number of Doctors</p>
                <p class="fs-30 mb-2 text-center fw-light h2">
                  00{doctors.length}
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-3 mb-4 stretch-card transparent">
            <div class="card bg-info-subtle">
              <div class="card-body">
                <p class="mb-4">Number of Clients</p>
                <p class="fs-30 text-center fw-light h2 mb-2">
                  00{allPatients.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-3 mt-2">
        <h4 className="card-title">Today’s Appointment</h4>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient Name</th>
              <th>Contact No</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {todaysAppointments &&
              todaysAppointments.map((todaysAppointment, index) => (
                <tr key={index}>
                  <td>{todaysAppointment?.appointmentId}</td>
                  <td>{todaysAppointment?.patientName}</td>
                  <td>{todaysAppointment?.patientContactNo}</td>
                  <td>{todaysAppointment?.scheduledTime}</td>
                  <td>{todaysAppointment?.doctor?.doctorName}</td>
                  <td>{todaysAppointment?.status}</td>
                </tr>
              ))}
            {/* <tr>
              <td>Messsy</td>
              <td>Flash</td>
              <td className="text-danger">
                {" "}
                21.06% <i className="ti-arrow-down" />
              </td>
              <td>
                <label className="badge badge-warning">In progress</label>
              </td>
            </tr>
            <tr>
              <td>John</td>
              <td>Premier</td>
              <td className="text-danger">
                {" "}
                35.00% <i className="ti-arrow-down" />
              </td>
              <td>
                <label className="badge badge-info">Fixed</label>
              </td>
            </tr>
            <tr>
              <td>Peter</td>
              <td>After effects</td>
              <td className="text-success">
                {" "}
                82.00% <i className="ti-arrow-up" />
              </td>
              <td>
                <label className="badge badge-success">Completed</label>
              </td>
            </tr>
            <tr>
              <td>Dave</td>
              <td>53275535</td>
              <td className="text-success">
                {" "}
                98.05% <i className="ti-arrow-up" />
              </td>
              <td>
                <label className="badge badge-warning">In progress</label>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>

      <div className="card mb-4 p-3 mt-2">
        <h4 className="card-title">Pending Bookings</h4>
        <table className="table table-hover p-3 mt-2">
          <thead>
            <tr>
              <th>OrderId</th>
              <th>Patient Name</th>
              <th>Test</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingBookings &&
              pendingBookings.map((pendingBooking, index) => (
                <tr key={index}>
                  <td>{pendingBooking?.id}</td>
                  <td>
                    {pendingBooking?.user?.firstName}{" "}
                    {pendingBooking?.user?.lastName}
                  </td>
                  <td>{pendingBooking.tests[0].testName}</td>
                  <td>{pendingBooking.date}</td>
                  <td>{pendingBooking.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
