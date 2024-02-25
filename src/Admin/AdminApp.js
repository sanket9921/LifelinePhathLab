import React from "react";
import Navbar from "./Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import TestBook from "./TestBook";
import Patients from "./Users/Patients";
import Doctors from "./Users/Doctors";
import Admin from "./Users/Admin";
import AddTest from "./Tests/AddTest";
import AllTest from "./Tests/AllTest";
import AddDoctor from "./Users/AddDoctor";
import Feedback from "./Feedback";
import Enquiry from "./Enquiry";
import Dashboard from "./Dashboard";
import Appointments from "./Appointments/Appointments";
import AppointmentDetails from "./Appointments/AppointmentDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditTest from "./Tests/EditTest";
import UploadReport from "./UploadReport";

function App() {
  return (
    <>
      {/* <Provider store={store}>
        <Navbar />
        <div className="container mt-3">
          <Outlet />
        </div>
      </Provider> */}
      <Provider store={store}>
        <Navbar />
        <ToastContainer />

        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route
              path="/appointmentsDetails/:id"
              element={<AppointmentDetails />}
            />
            <Route path="/testBookings" element={<TestBook />} />
            <Route path="/uploadReport/:id" element={<UploadReport />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/admins" element={<Admin />} />
            <Route path="/addtest" element={<AddTest />} />
            <Route path="/allTest" element={<AllTest />} />
            <Route path="/editTest/:id" element={<EditTest />} />
            <Route path="/addDoctor" element={<AddDoctor />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/enquiry" element={<Enquiry />} />
          </Routes>
        </div>
      </Provider>
    </>
  );
}

export default App;
