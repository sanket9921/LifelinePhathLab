import React, { useEffect, useState } from "react";
import Services from "../../Services/Services";
import { Link } from "react-router-dom";

export default function Appointments() {
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    Services.getAllappointment()
      .then((res) => {
        setAppointments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div class="col-12 col-xl-8 mb-4 mb-xl-0">
        <h3 class="font-weight-bold">Appointments</h3>
      </div>
      <div class="dropdown mb-4 ms-4 mt-4">
        <button
          class="btn btn-light dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filter
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="#">
              All
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Scheduled
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Completed
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Cancelled
            </a>
          </li>
        </ul>
      </div>
      <div className="card mt-2 p-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Patient Name</th>
              <th>Contact</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>status</th>
              <th>show Details</th>
            </tr>
          </thead>
          <tbody>
            {appointments &&
              appointments.map((appoitment) => (
                <tr key={appoitment.appointmentId}>
                  <td>{appoitment.appointmentId}</td>
                  <td>{appoitment.patientName}</td>
                  <td>{appoitment.patientContactNo}</td>
                  <td>{appoitment.scheduledTime}</td>
                  <td>{appoitment.doctor.doctorName}</td>
                  <td>
                    <label className="badge badge-danger">Pending</label>
                  </td>
                  <td>
                    <Link
                      className="text-primary"
                      to={"/appointmentsDetails/" + appoitment.appointmentId}
                    >
                      upload report
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
