import React, { useEffect, useState } from "react";
import Services from "../Services/Services";
import Cookies from "js-cookie";

export default function DisplayReports() {
  const [reports, setReports] = useState([]);
  const userEmail = Cookies.get("username");
  console.log(userEmail);

  //To fetch today's patientReports
  const getThePatientReports = () => {
    Services.getReportsByDoctorId(userEmail)
      .then((res) => {
        setReports(res.data);
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getThePatientReports();
  }, []);

  return (
    <div className="container mt-3 rounded display-report-container">
      <h3 className="text-center mb-5">Patient Reports</h3>
      <table class="table table-hover">
        <thead className="table-heading">
          <tr>
            <th scope="col">Report No.</th>
            <th scope="col">Patient Name</th>
            <th scope="col">Patient-Id</th>
            <th scope="col">Patient Mobile No</th>
            <th scope="col">Report Status</th>
          </tr>
        </thead>
        <tbody>
          {reports &&
            reports.map((report) => (
              <tr>
                <th scope="row">{report?.id}</th>
                <td>
                  {report?.user?.firstName} {report?.user?.lastName}
                </td>
                <td>{report?.user?.userId}</td>
                <td>{report?.user?.contactNo}</td>
                <td>
                  <a
                    href={`Files/doctor-licenses/${report?.licencePath}`}
                    download
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
