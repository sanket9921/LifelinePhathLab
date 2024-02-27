import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Services from "../Services/Services";

export default function UploadReport() {
  const [reportFile, setReportFile] = useState(null);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    Services.getOrdersById(id)
      .then((response) => {
        setOrder(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        toast.error(error.message, { onClose: 1000 });
      });
  }, []);

  const handleFileChange = (e) => {
    setReportFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("orderid", id);
    formData.append("file", reportFile);
    formData.append("userId", order?.user?.userId);
    formData.append("comment", comment);
    // console.log(order)
    try {
      await Services.addOrderReport(formData);
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
      {order && (
        <div class="col-12 mt-3 mb-3" key={order.id}>
          <h4 class="card-title fw-bold">Order Details</h4>
          <div className="row">
            <div className="col-6">
              <div>
                <p class="fw-semibold mt-3">Name</p>
                <p>
                  {order?.user?.firstName} {order?.user?.lastName}
                </p>
              </div>
              <div>
                <p class="fw-semibold">Address</p>
                <p>{order?.user?.address}</p>
              </div>
              <div>
                <p class="fw-semibold">Order Date</p>
                <p>{order?.date}</p>
              </div>
              <div>
                <p class="fw-semibold">Contact</p>
                <p>{order?.user?.contactNo}</p>
              </div>
            </div>
            <div className="col-6">
              <div>
                <p class="fw-semibold mt-3">Order Status</p>
                <p>{order?.status}</p>
              </div>
              <div>
                <p class="fw-semibold">Total Amount</p>
                <p>{order?.totalAmount}</p>
              </div>
              <div>
                <p class="fw-semibold">Order Date</p>
                <p>{order?.date}</p>
              </div>
              <div>
                <p class="fw-semibold">Contact</p>
                <p>{order?.user?.contactNo}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="col-12 mt-3 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Upload Patient report</h4>
            <form className="forms-sample" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>File upload</label>
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
