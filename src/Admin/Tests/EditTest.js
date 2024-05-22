import React, { useEffect, useState } from "react";
import Services from "../../Services/Services";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function EditTest() {
  const { id } = useParams();
  // const [Test,setTest]=useState();

  const [testName1, settestName] = useState("");
  const [testType1, settestType] = useState("");
  const [testDescription1, settestDescription] = useState("");
  const [actualPrice1, setactualPrice] = useState("");
  const [discount1, setdiscount] = useState("");
  const [finalPrice1, setfinalPrice] = useState("");

  useEffect(() => {
    Services.getTestById(id).then((res) => {
      settestName(res.data?.testName);
      settestType(res.data?.testType);
      settestDescription(res.data?.testDescription);
      setactualPrice(res.data?.actualPrice);
      setdiscount(res.data?.discount);
      setfinalPrice(res.data?.finalPrice);
      console.log(res.data);
    });
  }, []);

  const calculateFinalPrice = () => {
    const actualPrice = actualPrice1;
    const discount = discount1;

    // Check if both actualPrice and discount are valid numbers
    if (!isNaN(actualPrice) && !isNaN(discount)) {
      // Calculate final price with 2 decimal places
      const discountedAmount = (actualPrice * discount) / 100;
      setfinalPrice(actualPrice - discountedAmount);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("testName", testName1);
      formDataToSend.append("testType", testType1);
      formDataToSend.append("testDescription", testDescription1);
      formDataToSend.append("actualPrice", actualPrice1);
      formDataToSend.append("discount", discount1);
      formDataToSend.append("finalPrice", finalPrice1);

      await Services.editTestById(id, formDataToSend)
        .then((res) => {
          //alert("Test registered successfully!");
          toast.success("Test Registered Successfully!", { autoClose: 1000 });
        })
        .catch((err) => {
          //console.log(err);
          toast.error("Failed to register test. Please try again later!", {
            autoClose: 1000,
          });
        });
    } catch (error) {
      console.error("Error registering test:", error);
      //alert("Failed to register test. Please try again later.");
      toast.error("Failed to register test. Please try again later!", {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <div class="col-12 col-xl-8 mb-4 mb-xl-0">
        <h3 class="font-weight-bold mt-3">Edit Test Details</h3>
      </div>

      <div className="container mt-5 mb-3 p-4 bg-white pt-3">
        <div className="form-group">
          <label htmlFor="exampleInputName1">Test Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            name="testName"
            //value={formData.testName}
            value={testName1}
            onChange={(e) => {
              settestName(e.target.value);
            }}
            placeholder="Enter name or the test or package"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputName1">Test type</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            name="testType"
            value={testType1}
            onChange={(e) => {
              settestType(e.target.value);
            }}
            placeholder="Enter type of the test or package eg. blood, liver, allergies etc."
          />
        </div>
        <div class="form-group">
          <label for="exampleTextarea1">Test Description</label>
          <textarea
            class="form-control"
            id="exampleTextarea1"
            name="testDescription"
            value={testDescription1}
            onChange={(e) => {
              settestDescription(e.target.value);
            }}
            rows="4"
          ></textarea>
        </div>
        <div className="form-group row">
          <div className="col">
            <label>Actual Price</label>
            <div id="the-basics">
              <input
                className="typeahead"
                type="text"
                name="actualPrice"
                onChange={(e) => {
                  setactualPrice(e.target.value);
                }}
                value={actualPrice1}
                onBlur={calculateFinalPrice}
                placeholder="Enter Actual price"
              />
            </div>
          </div>
          <div className="col">
            <label>Discount %</label>
            <div id="bloodhound">
              <input
                className="typeahead"
                type="text"
                name="discount"
                onChange={(e) => {
                  setdiscount(e.target.value);
                }}
                value={discount1}
                onBlur={calculateFinalPrice}
                placeholder="Enter Discount in %"
              />
            </div>
          </div>
          <div className="col">
            <label>Final price</label>
            <div id="bloodhound">
              <input
                className="typeahead"
                type="text"
                name="finalPrice"
                value={finalPrice1}
                placeholder="Final price"
                readOnly
              />
            </div>
          </div>
        </div>
        <br />
        <button type="button" class="btn btn-primary" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </>
  );
}
