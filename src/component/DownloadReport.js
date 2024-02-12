import React from "react";

export default function DownloadReport() {
  return (
    <div>
      <div className="container download-container">
        <div className="dwl-container-inner">
          <h3>Download Your Test Report</h3>
          <br />
          <div className="download-icon">
            <i className="fa fa-user icon" />
          </div>
          <br />
          click below to download your test report
          <br />
          <br />
          <a href="file_path" download="file_name">
            Download Report
          </a>
        </div>
      </div>
    </div>
  );
}
