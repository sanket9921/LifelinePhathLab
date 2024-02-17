import axios from "axios";
const BACKEND_API = "http://localhost:8083/api";
class Services {
  userRegistration(user) {
    return axios.post(BACKEND_API + "/user", user);
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

  // appoitment schedule service
  getAllappointment() {
    return axios.get(BACKEND_API + "/appointments/list");
  }
  getAppointmentById(id) {
    return axios.get(BACKEND_API + "/appointments/" + id);
  }

  // Test Services

  addTest(formDataToSend) {
    return axios.post(BACKEND_API + "/tests/create", formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  getAllTest() {
    return axios.get(BACKEND_API + "/tests/all");
  }

  // Report Service
  addReport(formDataToSend) {
    return axios.post(BACKEND_API + "/reports/upload", formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

export default new Services();
