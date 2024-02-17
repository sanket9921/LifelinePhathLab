import React from "react";

export default function Enquiry() {
  return (
    <>
      <div class="col-12 col-xl-8 mb-4 mb-xl-0">
        <h3 class="font-weight-bold">Users Enquiry</h3>
      </div>

      <div className="card mt-2 p-3">
        <table
          className="table-hover"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th style={{ padding: 8, textAlign: "left" }}>ID</th>
              <th style={{ padding: 8, textAlign: "left" }}>User Name</th>
              <th style={{ padding: 8, textAlign: "left" }}>Phone No</th>

              <th
                style={{
                  padding: 8,
                  textAlign: "left",
                  width: "50%",
                  wordWrap: "break-word",
                }}
              >
                Message
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={{ borderTop: "1px solid lightgray", padding: 8 }}>
                1
              </td>
              <td style={{ borderTop: "1px solid lightgray", padding: 8 }}>
                JohnDoe
              </td>
              <td style={{ borderTop: "1px solid lightgray", padding: 8 }}>
                9839988934
              </td>
              <td style={{ borderTop: "1px solid lightgray", padding: 8 }}>
                123 Main Street, Lorem Ipsum, Dolor Sit Amet, Consectetur
                adipiscing elit.
              </td>
            </tr>
            <tr>
              <td style={{ borderTop: "1px solid lightgray", padding: 8 }}>
                1
              </td>
              <td style={{ borderTop: "1px solid lightgray", padding: 8 }}>
                JohnDoe
              </td>
              <td style={{ borderTop: "1px solid lightgray", padding: 8 }}>
                9839988934
              </td>
              <td style={{ borderTop: "1px solid lightgray", padding: 8 }}>
                123 Main Street, Lorem Ipsum, Dolor Sit Amet, Consectetur
                adipiscing elit.
              </td>
            </tr>
            <tr>
              <td style={{ borderTop: "1px solid lightgray", padding: 8 }}>
                1
              </td>
              <td style={{ borderTop: "1px solid lightgray", padding: 8 }}>
                JohnDoe
              </td>
              <td style={{ borderTop: "1px solid lightgray", padding: 8 }}>
                9839988934
              </td>
              <td style={{ borderTop: "1px solid lightgray", padding: 8 }}>
                123 Main Street, Lorem Ipsum, Dolor Sit Amet, Consectetur
                adipiscing elit.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
