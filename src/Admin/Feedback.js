import React, { useEffect, useState } from "react";
import Services from "../Services/Services";
import { toast } from "react-toastify";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    Services.getAllFeedbacks()
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch((err) => {
       // alert(err.message);
        toast.error(err.message,{onClose:1000});
      });
  }, []);

  const showHandler = (feedbackId) => {
    Services.showFeedbackToClient(feedbackId)
      .then((res) => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        toast.success("Show HomePage Feedback successfully",{onClose:1000});
      })
      .catch((err) => {
        //alert(err.message);
        toast.error(err.message,{onClose:1000});
      });
  };

  return (
    <>
      <div class="col-12 col-xl-8 mb-4 mb-xl-0">
        <h3 class="font-weight-bold mt-3">Feedback</h3>
      </div>

      <div className="card mt-2 p-3">
        <table
          className="table-hover"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th style={{ padding: 8, textAlign: "left" }}>Feedback ID</th>
              <th style={{ padding: 8, textAlign: "left" }}>Cient Name</th>
              <th style={{ padding: 8, textAlign: "left" }}>Phone No</th>
              <th
                style={{
                  padding: 8,
                  textAlign: "left",
                  width: "50%",
                  wordWrap: "break-word",
                }}
              >
                Feedback
              </th>
              <th style={{ padding: 8, textAlign: "left" }}>
                Disply To Client
              </th>
              <th style={{ padding: 8, textAlign: "left" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks &&
              feedbacks.map((feedback) => (
                <tr>
                  <td
                    style={{
                      borderTop: "1px solid lightgray",
                      padding: 8,
                    }}
                  >
                    {feedback.feedbackId}
                  </td>
                  <td
                    style={{
                      borderTop: "1px solid lightgray",
                      padding: 8,
                    }}
                  >
                    {feedback.clientName}
                  </td>
                  <td
                    style={{
                      borderTop: "1px solid lightgray",
                      padding: 8,
                    }}
                  >
                    {feedback.contactNo}
                  </td>
                  <td
                    style={{
                      borderTop: "1px solid lightgray",
                      padding: 8,
                    }}
                  >
                    {feedback.feedback}
                  </td>
                  <td
                    style={{
                      borderTop: "1px solid lightgray",
                      padding: 8,
                    }}
                  >
                    {feedback.displayToClient}
                  </td>
                  <td
                    style={{
                      borderTop: "1px solid lightgray",
                      padding: 8,
                    }}
                  >
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => showHandler(feedback.feedbackId)}
                    >
                      Show
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
