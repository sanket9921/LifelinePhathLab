import React, { useState, useEffect, useId } from "react";
import { useParams } from "react-router-dom";
import Services from "../../Services/Services";
import { toast } from "react-toastify";
export default function AppointmentDetails() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    Services.getAppointmentById(id)
      .then((response) => {
        setAppointment(response.data);
        // console.log(appointment?.doctor?.doctorId);
        console.log(appointment);
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.message, { onClose: 1000 });
      });
  }, []);
  // const [userId, setUserId] = useState("");
  // const [doctorId, setDoctorId] = useState("");
  const [reportFile, setReportFile] = useState(null);
  const [comment, setComment] = useState("");

  const handleFileChange = (e) => {
    setReportFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", reportFile);
    formData.append("appoitmentid", id);
    formData.append("userId", appointment?.user?.userId);
    formData.append("doctorId", appointment?.doctor?.doctorId);
    formData.append("comment", comment);
    console.log(comment);
    console.log(appointment?.user?.userId);
    console.log(appointment?.doctor?.doctorId);
    console.log(reportFile);
    console.log(formData.get("userId"));
    try {
      await Services.addReport(formData);

      // await axios.post("http://localhost:8083/api/reports/upload", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      // alert("Report uploaded successfully!");
      toast.success("Report uploaded successfully!", { onClose: 1000 });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      //alert("Failed to upload report: " + error.message);
      toast.error("Failed to upload report: " + error.message, {
        onClose: 1000,
      });
    }
  };

  return (
    <>
      <div class="col-12 col-xl-8 mb-4 mb-xl-0">
        <h3 class="fw-semibold">Appointments Details</h3>
      </div>
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            {appointment && (
              <div class="row">
                <div class="col-md-6" key={appointment.appointmentId}>
                  <h4 class="card-title fw-bold">Patient Details</h4>

                  <div>
                    <p class="fw-semibold">Name</p>
                    <p>{appointment.patientName}</p>
                  </div>
                  <div>
                    <p class="fw-semibold">Address</p>
                    <p>{appointment.patientAddress}</p>
                  </div>
                  <div>
                    <p class="fw-semibold">Appoitment Date</p>
                    <p>{appointment.scheduledTime}</p>
                  </div>
                  <div>
                    <p class="fw-semibold">Contact</p>
                    <p>{appointment.patientContactNo}</p>
                  </div>
                </div>

                <div class="col-md-6">
                  <h4 class="card-title fw-bold">Doctor Details</h4>
                  <div>
                    <p class="fw-semibold">Name</p>
                    <p>{appointment?.doctor?.doctorName}</p>
                  </div>
                  <div>
                    <p class="fw-semibold">Hospital name</p>
                    <p>{appointment?.doctor?.clinicName}</p>
                  </div>
                  <div>
                    <p class="fw-semibold">Address</p>
                    <p>{appointment?.doctor?.address}</p>
                  </div>

                  <div>
                    <p class="fw-semibold">Contact</p>
                    <p>{appointment?.doctor?.contactNo}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div class="card-body">
            <h4 class="card-title">Prescription</h4>
            <a
              className="btn btn-primary mb-5"
              href={
                "../Files/prescriptions/" + appointment.prescriptionFilePath
              }
              // href={
              //   appointment?.prescriptionFilePath
              //     ? `Files/prescriptions/${appointment.prescriptionFilePath}`
              //     : "#"
              // }
              download
            >
              Download Prescriptions
            </a>
            <iframe
              src={`../Files/prescriptions/${appointment.prescriptionFilePath}`}
              width="100%"
              height="500"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="col-12 mt-3 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Upload Patient report</h4>
            {/* <p className="card-description">Basic form elements</p> */}
            <form className="forms-sample" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>File upload</label>
                {/* <input
                  type="file"
                  name="img[]"
                  className="file-upload-default"
                /> */}
                <div className="input-group col-xs-12">
                  <input
                    type="file"
                    className="form-control file-upload-info"
                    disabled=""
                    placeholder="Upload Report"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleTextarea1">Comment</label>
                <textarea
                  className="form-control"
                  id="exampleTextarea1"
                  rows={4}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
