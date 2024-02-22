import axios from "axios";
import Cookies from "js-cookie";
const BACKEND_API = "http://localhost:8083/api";
const jwt = Cookies.get("jwtToken");

class Services {
  //Homepage Best Offers
  getBestOffers() {
    return axios.get(BACKEND_API + "/tests/bestOffers");
  }

  getUserByid(userId) {
    return axios.get(BACKEND_API + "/user/" + userId);
  }

  verifyUser(user) {
    return axios.put(BACKEND_API + "/user/verify-account", user);
  }

  reGenerateOTP(formData) {
    return axios.put(BACKEND_API + "/user/regenerate-otp", formData);
  }
  userRegistration(user) {
    return axios.post(BACKEND_API + "/user/create", user);
  }

  bookOrder(order) {
    return axios.post(BACKEND_API + "/orders/addOrder", order);
  }

  userLogin(user) {
    return axios.post(BACKEND_API + "/user/login", user);
  }

  //search bar api
  getTestByName(name) {
    return axios.get(BACKEND_API + "/tests/testName/" + name);
  }

  addClientFeedback(clientFeedback) {
    return axios.post(BACKEND_API + "/feedback", clientFeedback);
  }
  getClientFeedbacks() {
    return axios.get(BACKEND_API + "/feedback");
  }

  addEnquiry(enquiry) {
    return axios.post(BACKEND_API + "/enquiry", enquiry);
  }

  getClientFeedbacks() {
    return axios.get(BACKEND_API + "/feedback/review",
    {headers: { "Authorization": "Bearer "+jwt }}
    );
  }

  getAllTests() {
    return axios.get(BACKEND_API + "/tests");
  }

  // appoitment schedule service
  getAppointmentByStatus(status) {
    return axios.get(BACKEND_API + "/appointments/list/" + status);
  }
  getAppointmentById(id) {
    return axios.get(BACKEND_API + "/appointments/" + id);
  }
  SheduleAppointment(formData){
    return axios.post(BACKEND_API + "/appointments/schedule",formData,{
      headers: { "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+jwt}});
  }
  // Test Services

  addTest(formDataToSend) {
    return axios.post(BACKEND_API + "/tests/create", formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  deleteTestById(id) {
    return axios.delete(BACKEND_API + "/tests/" + id);
  }

  editTestById(id,formData) {
    return axios.put(BACKEND_API + "/tests/" + id,formData, 
    { headers: { "Content-Type": "multipart/form-data" },
  });
  }

  getTestById(id) {
    return axios.get(BACKEND_API + "/tests/" + id);
  }

  getAllTest() {
    return axios.get(BACKEND_API + "/tests/all/");
  }

  getTestByTestType(type) {
    return axios.get(BACKEND_API + "/tests/all/" + type);
  }

  getAllTestType() {
    return axios.get(BACKEND_API + "/tests/TestType");
  }
  //admin panel services

  getAllPatients() {
    return axios.get(BACKEND_API + "/user/patients");
  }

  deletePatientById(userId) {
    return axios.delete(BACKEND_API + "/user/" + userId);
  }

  getPendingRequests() {
    return axios.get(BACKEND_API + "/doctors/pending");
  }

  getAllDoctors() {
    return axios.get(BACKEND_API + "/doctors/list");
  }

  getAllApprovalDoctor(){
    return axios.get(BACKEND_API + "/doctors/approved")
  }
  updateRequestStatus(doctorId) {
    return axios.put(BACKEND_API + "/doctors/request/" + doctorId);
  }

  rejectDoctorRequest(doctorId) {
    return axios.put(BACKEND_API + "/doctors/reject/" + doctorId);
  }

  deleteDoctorRecord(doctorId) {
    return axios.delete(BACKEND_API + "/doctors/" + doctorId);
  }

  getAllAdmins() {
    return axios.get(BACKEND_API + "/user/admins");
  }

  UpdateUserRole(uId) {
    return axios.put(BACKEND_API + "/user/admins/" + uId);
  }

  getAllEnquiries() {
    return axios.get(BACKEND_API + "/enquiry");
  }

  getAllFeedbacks() {
    return axios.get(BACKEND_API + "/feedback");
  }

  showFeedbackToClient(feedbackId) {
    return axios.put(BACKEND_API + "/feedback/" + feedbackId
    // {headers: { "Authorization": "Bearer "+jwt }}

    );
    // return axios.get(BACKEND_API + "/tests/all");
  }

  // Report Service
  addReport(formDataToSend) {
    return axios.post(BACKEND_API + "/reports/upload", formDataToSend, {
      headers: { "Content-Type": "multipart/form-data",
      "Authorization": "Bearer "+jwt

    },
    });
  }
}

export default new Services();
