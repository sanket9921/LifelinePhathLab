import React, { useEffect, useState } from "react";
import Services from "../../Services/Services";

export default function Doctors() {
  
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    Services.getAllDoctors()
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);
 
  const handleDelete = (doctorId) => {
    Services.deleteDoctorRecord(doctorId)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div class="col-12 col-xl-8 mb-4 mb-xl-0">
        <h3 class="font-weight-bold">Doctors</h3>
      </div>
      <div className="form-group m-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter the Doctor Id"
          />
          <div className="input-group-append">
            <button className="btn btn-sm btn-primary" type="button">
              Search
            </button>
          </div>
        </div>
      </div>    
      <h3 class="font-weight-bold ms-3">All Doctors</h3>
      <br />
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Doctor Id</th>
                    <th>Doctor Name</th>
                    <th>Clinic Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Specialization</th>
                    <th>Request Status</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors &&
                    doctors.map((doctor) => (
                      <tr>
                        <td>{doctor.doctorId}</td>
                        <td>{doctor.doctorName}</td>
                        <td>{doctor.clinicName}</td>
                        <td>{doctor.emailId}</td>
                        <td>{doctor.contactNo}</td>
                        <td>{doctor.address}</td>
                        <td>{doctor.specialization}</td>
                        <td>{doctor.requestStatus}</td>
                        <td>
                          <button
                            onClick={() => handleDelete(doctor.doctorId)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
