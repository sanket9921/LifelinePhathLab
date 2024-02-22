import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { sendTestCategoryData } from "../redux/reducers/categoryReducer";
export default function TestFilter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchTestTypes = (data) => {
    dispatch(sendTestCategoryData(data));
    navigate("/bookTest");
  };
  return (
    <div className=" container mt-3 rounded scroll-container">
      <div className="text-center my-3 mt-3">
      <h3> 
         Test by Health Risks
      </h3>
      </div>
      <div className="scroll-wrapper">
        <div
          className="scroll-item"
          onClick={() => dispatchTestTypes("Allergy")}
        >
          <div className="circle">
            <img src="assests/image/allergy.png" alt="Image 1" />
            <p>Allergy</p>
          </div>
        </div>
        <div className="scroll-item" onClick={() => dispatchTestTypes("Brain")}>
          <div className="circle">
            <img src="assests/image/brain.png" alt="Image 1" />
            <p>Brain</p>
          </div>
        </div>
        <div
          className="scroll-item"
          onClick={() => dispatchTestTypes("Diabetes")}
        >
          <div className="circle">
            <img src="assests/image/diabetes.png" alt="Image 1" />
            <p>Diabetes</p>
          </div>
        </div>
        <div className="scroll-item" onClick={() => dispatchTestTypes("Heart")}>
          <div className="circle">
            <img src="assests/image/heart.png" alt="Image 1" />
            <p>Heart</p>
          </div>
        </div>
        <div className="scroll-item" onClick={() => dispatchTestTypes("Liver")}>
          <div className="circle">
            <img src="assests/image/liver.png" alt="Image 1" />
            <p>Liver</p>
          </div>
        </div>
        <div
          className="scroll-item"
          onClick={() => dispatchTestTypes("kidney")}
        >
          <div className="circle">
            <img src="assests/image/kidney.png" alt="Image 1" />
            <p>kidney</p>
          </div>
        </div>
        <div className="scroll-item" onClick={() => dispatchTestTypes("Lungs")}>
          <div className="circle">
            <img src="assests/image/lungs.png" alt="Image 1" />
            <p>Lungs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
