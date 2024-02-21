import React, { useState, useEffect } from "react";
import Services from "../../Services/Services";

export default function AddTest({ isUpdate, testId }) {
    //const { testId } = useParams();

  const [previewSrc, setPreviewSrc] = useState("");
  const [formData, setFormData] = useState({
    testName: "",
    testType: "",
    testDescription: "",
    actualPrice: 0,
    discount: 0,
    finalPrice: 0,
    photoFile: null,
  });

  useEffect(() => {
    // Fetch test details if in update mode
    if (isUpdate) {
      // Fetch test details based on testId
      Services.getTestDetails(testId)
        .then((res) => {
          const { testName, testType, testDescription, actualPrice, discount, finalPrice } = res.data;
          setFormData({ testName, testType, testDescription, actualPrice, discount, finalPrice });
        })
        .catch((err) => {
          console.log("Error fetching test details:", err);
        });
    }
  }, [isUpdate, testId]);

  const previewImage = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setPreviewSrc(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    previewImage(e.target);
    setFormData({ ...formData, photoFile: e.target.files[0] });
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    previewImage(droppedFiles[0]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "actualPrice" || name === "discount") {
      calculateFinalPrice();
    }
  };

  const calculateFinalPrice = () => {
    const actualPrice = Number(formData.actualPrice);
    const discount = Number(formData.discount);
    if (!isNaN(actualPrice) && !isNaN(discount)) {
      const discountedAmount = (actualPrice * discount) / 100;
      const finalPrice = actualPrice - discountedAmount;
      setFormData((prevData) => ({ ...prevData, finalPrice }));
    } else {
      setFormData((prevData) => ({ ...prevData, finalPrice: 0 }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("testName", formData.testName);
      formDataToSend.append("testType", formData.testType);
      formDataToSend.append("testDescription", formData.testDescription);
      formDataToSend.append("actualPrice", formData.actualPrice);
      formDataToSend.append("discount", formData.discount);
      formDataToSend.append("finalPrice", formData.finalPrice);
      formDataToSend.append("photoFile", formData.photoFile);

      let response;
      if (isUpdate) {
        response = await Services.updateTest(testId, formDataToSend);
      } else {
        response = await Services.addTest(formDataToSend);
      }
      
      alert(response.data.message);
      setFormData({
        testName: "",
        testType: "",
        testDescription: "",
        actualPrice: 0,
        discount: 0,
        finalPrice: 0,
        photoFile: null,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit. Please try again later.");
    }
  };

  return (
    <>
      <div className="col-12 col-xl-8 mb-4 mb-xl-0">
        <h3 className="font-weight-bold">{isUpdate ? "Update Test" : "Add Test"}</h3>
      </div>
      <div className="container mt-5 mb-3 pb-3 bg-white pt-3">
      <div className="text-center">
          <h2 className="mb-4">Upload Photo</h2>
          <label
            htmlFor="photo-input"
            id="preview-container"
            className="form-group"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p>Click here to upload photo</p>
            <input
              type="file"
              className="form-control-file d-none"
              id="photo-input"
              accept="image/*"
              onChange={(e) => {
                handleFileInputChange(e); // Call the first function
                handleFileChange(e); // Call the second function
              }}
            />
            {previewSrc && (
              <img id="preview-image" src={previewSrc} alt="Preview" />
            )}
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputName1">Test Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            name="testName"
            value={formData.testName}
            onChange={handleChange}
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
            value={formData.testType}
            onChange={handleChange}
            placeholder="Enter type of the test or package eg. blood, liver, allergies etc."
          />
        </div>
        <div class="form-group">
          <label for="exampleTextarea1">Test Description</label>
          <textarea
            class="form-control"
            id="exampleTextarea1"
            name="testDescription"
            value={formData.testDescription}
            onChange={handleChange}
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
                onChange={handleChange}
                value={formData.actualPrice}
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
                onChange={handleChange}
                value={formData.discount}
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
                value={formData.finalPrice}
                placeholder="Final price"
                readOnly
              />
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-primary" onClick={handleSubmit}>
          Add Test
        </button>
      </div>
      
    </>
  );
}
