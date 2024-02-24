import React from "react";
import { Route, Routes } from "react-router-dom";
import DisplayReports from "./DisplayReports";
import Header from "./Header";
import UploadPrescriptionThroughDoctor from "./UploadPrescriptionThroughDoctor";

export default function DoctorApp() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<DisplayReports />} />
        <Route path="/prescription" element={<UploadPrescriptionThroughDoctor />} />
      </Routes>
    </>
  );
}
