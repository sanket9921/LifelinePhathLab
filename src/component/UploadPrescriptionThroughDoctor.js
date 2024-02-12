import React from "react";

export default function UploadPrescriptionThroughDoctor() {
  return (
    <div className="container bg-white uploadPresc-container">
      <div className="row">
        <div className="col-lg-4 col-12">
          <h3>Upload The Prescription</h3>
          <div className="input-icons">
            <i className="fa fa-user icon" />
            <input
              className="input-field"
              type="text"
              placeholder="Enter Patient Name"
              required=""
            />
          </div>
          <div className="input-icons">
            <i className="fa fa-user icon" />
            <input
              className="input-field"
              type="text"
              placeholder="Patient Contact Number"
              required=""
            />
          </div>
          <div className="input-icons ">
            <input
              className="input-field"
              type="date"
              placeholder="Schedule Appointment"
            />
          </div>
          <div className="input-icons">
            <i className="fa fa-user icon" />
            <input
              className="input-field file-upload"
              type="file"
              id="myfile "
              name="myfile"
              accept=".jpg, .jpeg, .png, .doc, .pdf "
              required=""
            />
          </div>
          <p className="file-upload-format">
            should be in .doc, .pdf, .jpeg, .jpg, .png format*
          </p>
          <button className="button" type="submit" value="submit">
            Submit
          </button>
          <br />
        </div>
        <div className="col-lg-8 col-12 vl">
          <div className="container">
            <br />
            <br />
            <h4>Receive Your Test Resale in 3 Easy Steps</h4>
            <br />
            <div className="row">
              <div className="col-lg-4 col-12">
                <div className="upload-steps-circle">1</div>
                <br />
                <div>
                  <h5>Upload Prescription</h5>
                  <p>
                    Upload the prescription get call from us and Schedule your
                    appointment.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="upload-steps-circle">2</div>
                <br />
                <div>
                  <h5>Prepare For Test</h5>
                  <p>
                    Discuss the necessary directions with your physician before
                    any medical diagnostic test.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-12">
                <div className="upload-steps-circle">3</div>
                <br />
                <div>
                  <h5>Get The Report</h5>
                  <p>Your test results will upload within 2-3 days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
