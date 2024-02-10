import React, { useState } from "react";

export default function AddTest() {
  const [previewSrc, setPreviewSrc] = useState("");

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
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add hover effect if needed
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    previewImage(droppedFiles[0]);
  };

  return (
    <>
      <div class="col-12 col-xl-8 mb-4 mb-xl-0">
        <h3 class="font-weight-bold">Doctors</h3>
      </div>
      <div className="container mt-5">
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
              onChange={handleFileInputChange}
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
            placeholder="Name"
          />
        </div>
        <div class="form-group">
          <label for="exampleTextarea1">Test Description</label>
          <textarea
            class="form-control"
            id="exampleTextarea1"
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
                placeholder="Final price"
                value="51"
                readOnly
              />
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-primary">
          Primary
        </button>
      </div>
    </>
  );
}
