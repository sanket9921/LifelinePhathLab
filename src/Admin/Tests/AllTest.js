import React, { useEffect, useState } from "react";
import Services from "../../Services/Services";

export default function AllTest() {
  const [Tests, setTest] = useState([]);

  useEffect(() => {
    Services.getAllTest()
      .then((res) => {
        setTest(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div class="col-12 col-xl-8 mb-4 mb-xl-0">
        <h3 class="font-weight-bold">All Test</h3>
      </div>
      <div className="form-group m-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter the Test Name"
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
              <table
                className="table-hover"
                style={{ borderCollapse: "collapse", width: "100%" }}
              >
                <thead>
                  <tr>
                    <th style={{ padding: 8, textAlign: "left" }}>Test ID</th>
                    <th style={{ padding: 8, textAlign: "left" }}>Test Name</th>
                    <th style={{ padding: 8, textAlign: "left" }}>Test Type</th>

                    <th
                      style={{
                        padding: 8,
                        textAlign: "left",
                        width: "30%",
                        wordWrap: "break-word",
                      }}
                    >
                      Test Description
                    </th>
                    <th style={{ padding: 8, textAlign: "left" }}>
                      Actual price
                    </th>
                    <th style={{ padding: 8, textAlign: "left" }}>Discount</th>
                    <th style={{ padding: 8, textAlign: "left" }}>
                      Final price
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Tests &&
                    Tests.map((test) => (
                      <tr>
                        <td
                          style={{
                            borderTop: "1px solid lightgray",
                            padding: 8,
                          }}
                        >
                          {test.testId}
                        </td>
                        <td
                          style={{
                            borderTop: "1px solid lightgray",
                            padding: 8,
                          }}
                        >
                          {test.testName}
                        </td>

                        <td
                          style={{
                            borderTop: "1px solid lightgray",
                            padding: 8,
                          }}
                        >
                          {test.testType}
                        </td>
                        <td
                          style={{
                            borderTop: "1px solid lightgray",
                            padding: 8,
                          }}
                        >
                          {test.testDescription}
                        </td>
                        <td
                          style={{
                            borderTop: "1px solid lightgray",
                            padding: 8,
                          }}
                        >
                          {test.actualPrice}
                        </td>
                        <td
                          style={{
                            borderTop: "1px solid lightgray",
                            padding: 8,
                          }}
                        >
                          {test.discount}%
                        </td>
                        <td
                          style={{
                            borderTop: "1px solid lightgray",
                            padding: 8,
                          }}
                        >
                          {test.finalPrice}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
