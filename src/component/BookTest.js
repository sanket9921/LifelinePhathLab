import { useEffect, useState } from "react";
import TestDescription from "./TestDescription";
import Services from "../Services/Services";
import TestTypes from "./TestTypes";
import { UseSelector, useSelector } from "react-redux";
export default function BookTest() {
  const testCategory = useSelector((state) => state.testCategory.value);

  function showModel() {
    document.querySelector(".overlay").classList.add("showOverlay");
  }

  const [tests, setTests] = useState([]);
  useEffect(() => {
    console.log(testCategory);
    Services.getTestByTestType(testCategory)
      .then((res) => {
        setTests(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
    // console.log(tests)
  }, [testCategory]);

  return (
    <div className="container mt-2 rounded Test">
      <TestDescription />
      <div className="row">
        <div className="col-2 border p-2">
          <TestTypes />
        </div>
        <div className="col-10">
          <div className="row">
            {tests &&
              tests.map((test) => (
                <div
                  onClick={showModel}
                  className="product-cart rounded col-3 mt-3"
                  key={test.testId}
                >
                  <div className="img">
                    <img
                      className="img-fluid"
                      src={`http://localhost:3000/file/TestImage/${test.testImagePath}`}
                      alt="default"
                    />
                  </div>
                  <div className="title mt-3 text-center">
                    <h4>{test.testName}</h4>
                  </div>
                  <div className="price">
                    <span className="off">{test.discount}% off</span>
                    <span className="dis-price">
                      {test.finalPrice}{" "}
                      <del className="actual-price">{test.actualPrice}</del>
                    </span>
                  </div>
                  <div className="action-btn mt-3 ">
                    <button className="card">Add to cart</button>
                    <button className="buy">Buy Now</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
