import React from "react";
import { Route, Routes } from "react-router-dom";
//import Switch from "react-router-dom";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import TopBar from "./component/TopBar";
import SearchBar from "./component/SearchBar";
import { Provider } from "react-redux";
import store from "./redux/store";
import TestDetails from "./component/TestDetails";
import Home from "./component/Home";
import BookTest from "./component/BookTest";
import UploadPrescription from "./component/UploadPrescription";
import DownloadReport from "./component/DownloadReport";
import Contact from "./component/Contact";
import Cart from "./component/Cart";
import Login from "./LandingPage/Login";
import Signup from "./LandingPage/Signup";
import { ToastContainer } from "react-toastify";
import UserProfile from "./component/UserProfile";
import Otp from "./LandingPage/Otp";
import ForgotPassword from "./LandingPage/ForgotPassword";
import DoctorRegistration from "./Doctor/DoctorRegistration";

export default function App() {
  return (
    // <>
    //   <Provider store={store}>
    //     <TopBar />
    //     <Navbar />
    //     <SearchBar />
    //     <Outlet />
    //     <Footer />
    //   </Provider>
    // </>
    <>
      <Provider store={store}>
        <TopBar />
        <Navbar />
        <SearchBar />
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookTest" element={<BookTest />} />
          <Route path="/testDetails/:testName" element={<TestDetails />} />
          <Route path="/uploadPrescription" element={<UploadPrescription />} />
          <Route path="/downloadReport" element={<DownloadReport />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/verifyOtp/:email" element={<Otp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/fotgotPassword" element={<ForgotPassword />} />
          <Route path="/doctorResister" element={<DoctorRegistration />} />
        </Routes>

        <Footer />
      </Provider>
    </>
  );
}
