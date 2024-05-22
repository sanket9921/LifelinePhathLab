import React, { useEffect, useState } from "react";
import Services from "../Services/Services";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DownloadReport() {
  const [modalSrc, setModalSrc] = useState("");
  const [reports, setReports] = useState([]);
  const userid = Cookies.get("userId");
  const isloggedIn = Cookies.get("isLoggedIn");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isloggedIn) {
      // toast.error("Please Login First", { onClose: 100 });
      navigate("/login");
      return;
    }

    Services.getAllReportbyuserid(userid).then((res) => {
      setReports(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h1 className="mt-5">Your Pathology Reports</h1>
      {/* Sample report container */}

      {reports &&
        reports.map((report, i) => (
          <div className="report-container rounded">
            <div className="row">
              <div className="col-md-6">
                <h3>Report</h3>
              </div>
              <div className="col-md-6">
                Date: <p>{report.uploadDate}</p>
              </div>
            </div>
            <p>{report.comment}</p>

            <a
              href={"../Files/Reports/" + report.reportFileName}
              className="btn btn-primary ml-2"
              download
            >
              Download Report
            </a>
          </div>
        ))}
    </div>
  );
}

export default DownloadReport;
