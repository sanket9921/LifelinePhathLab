import React from "react";

export default function AddDoctor() {
  return (
    <>
      <div class="col-12 col-xl-8 mb-4 mb-xl-0">
        <h3 class="font-weight-bold">Doctors request for tie up</h3>
      </div>

      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>123</td>
                    <td>Surana</td>
                    <td>surana@q23.c</td>
                    <td>899389389</td>
                    <td>Aanand Hospital</td>
                    <td>MABS</td>
                    <td>20</td>
                    <td>Mandavagan Pharata</td>
                    <td>
                      <a href="File">download</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
