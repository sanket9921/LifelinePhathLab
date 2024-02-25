import React, { useEffect, useState } from "react";
import Services from "../../Services/Services";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
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

  const deleteTest = (id) => {
    Services.deleteTestById(id)
      .then((res) => {
        // alert(res.data);
        toast.success("Test Deleted Successfully!", { autoClose: 1000 });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        toast.error("Failed to delete test. Please try again later!", {
          autoClose: 1000,
        });
      });
  };

  const navigateToNewPage = () => {
    window.location.href = "/EditTest";
    // Change the URL to the desired page
  };

  return (
    <>
      <div class="col-12 col-xl-8 mb-4 mb-xl-0">
        <h3 class="font-weight-bold">All Test</h3>
      </div>
      {/* <form class="d-flex" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Enter Test id"
          aria-label="Search"
        />
        <button class="btn btn-primary" type="submit">
          Search
        </button>
      </form> */}

      <div className="card mt-2 p-3">
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
              <th style={{ padding: 8, textAlign: "left" }}>Actual price</th>
              <th style={{ padding: 8, textAlign: "left" }}>Discount</th>
              <th style={{ padding: 8, textAlign: "left" }}>Final price</th>
              <th style={{ padding: 8, textAlign: "left" }}>Edit</th>
              <th style={{ padding: 8, textAlign: "left" }}>Delete</th>
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
                  <td
                    style={{
                      borderTop: "1px solid lightgray",
                      padding: 8,
                    }}
                  >
                    <Link
                      class=" btn btn-outline-warning"
                      to={"/editTest/" + test.testId}
                    >
                      Edit
                    </Link>
                  </td>
                  <td
                    style={{
                      borderTop: "1px solid lightgray",
                      padding: 8,
                    }}
                  >
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      onClick={() => deleteTest(test.testId)}
                    >
                      Delete
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
