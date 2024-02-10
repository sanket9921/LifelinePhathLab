import React from "react";

export default function Doctors() {
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

      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>PatientID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>123</td>
                    <td>sanket</td>
                    <td>allergies</td>
                    <td>09-02-2024</td>
                    <td>9921410715</td>
                    <td>
                      A/p Mandavagan Pharata tal. shirur Dist. Pune, 412211
                    </td>
                  </tr>
                  <tr>
                    <td>Messsy</td>
                    <td>Flash</td>
                    <td className="text-danger">
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
                      98.05% <i className="ti-arrow-up" />
                    </td>
                    <td>
                      <label className="badge badge-warning">In progress</label>
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
