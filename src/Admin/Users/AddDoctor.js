import React, { useEffect, useState } from "react";
import Services from "../../Services/Services";
import { toast } from "react-toastify";

export default function AddDoctor() {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    Services.getPendingRequests()
      .then((res) => {
        setPendingRequests(res.data);
      })
      .catch((err) => {
        //alert(err.message);
        toast.error(err.message, { autoClose: 1000 });
      });
  }, []);

  const handleApporved = (doctorId) => {
    Services.updateRequestStatus(doctorId)
      .then((res) => {
        toast.success("Docter Apporved Successfully!", { autoClose: 1000 });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        //alert(err.message);
        toast.error(err.message, { autoClose: 1000 });
      });
  };

  const handleRejected = (doctorId) => {
    Services.rejectDoctorRequest(doctorId)
      .then((res) => {
        toast.success("Docter Rejected Successfully!", { autoClose: 1000 });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        //alert(err.message);
        toast.error(err.message, { autoClose: 1000 });
      });
  };

  return (
    <>
      <div class="col-12 col-xl-8 mb-4 mb-xl-0">
        <h3 class="font-weight-bold mt-3">Doctors Request For Tie-Up</h3>
      </div>

      <div className="card mt-3 p-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Doctor ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Clinic Name</th>
              <th>Specilization</th>
              <th>Experience</th>
              <th>Address</th>
              <th>Licence</th>
              <th>Approve</th>
              <th>Reject</th>
            </tr>
          </thead>

          <tbody>
            {pendingRequests &&
              pendingRequests.map((pendingRequest) => (
                <tr>
                  <td>{pendingRequest.doctorId}</td>
                  <td>{pendingRequest.doctorName}</td>
                  <td>{pendingRequest.emailId}</td>
                  <td>{pendingRequest.contactNo}</td>
                  <td>{pendingRequest.clinicName}</td>
                  <td>{pendingRequest.specialization}</td>
                  <td>{pendingRequest.experience}</td>
                  <td>{pendingRequest.address}</td>
                  <td>
                    <a
                      // href="File/doctor-licenses/6e61ff89-7513-4f96-974d-c25cbe2cba1d_ApplicationForm.pdf"
                      href={`Files/doctor-licenses/${pendingRequest.licencePath}`}
                      download
                    >
                      Download
                    </a>
                  </td>
                  <td>
                    <button
                      onClick={() => handleApporved(pendingRequest.doctorId)}
                      className="btn btn-outline-success"
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleRejected(pendingRequest.doctorId)}
                      className="btn btn-outline-danger"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
