import React from "react";

export default function DisplayReports() {
  return (
    <div className="container mt-3 rounded display-report-container">
      <h3 className="text-center mb-5">Patient Reports</h3>
      <table class="table table-hover">
        <thead className="table-heading">
          <tr>
            <th scope="col">Sr No.</th>
            <th scope="col">Patient Name</th>
            <th scope="col">Patient-Id</th>
            <th scope="col">Patient Mobile No</th>
            <th scope="col">Report Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>PID-1111</td>
            <td>9765238562</td>
            <td>
              <a href="file_path" className="text-primary" download="file_name">
                Download Report
              </a>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>PID-1112</td>
            <td>8561243524</td>
            <td>
              {" "}
              <a href="file_path" className="text-primary" download="file_name">
                Download Report
              </a>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry the Bird</td>
            <td>PID-1113</td>
            <td>9523512454</td>
            <td>
              {" "}
              <a href="file_path" className="text-primary" download="file_name">
                Download Report
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
