import axios from "axios";
const BACKEND_API = "http://localhost:8083/api";
class Services {
  userRegistration(user) {
    return axios.post(BACKEND_API + "/user", user);
  }

  addClientFeedback(clientFeedback) {
    return axios.post(BACKEND_API + "/feedback", clientFeedback);
  }

  addEnquiry(enquiry) {
    return axios.post(BACKEND_API + "/enquiry", enquiry);
  }

  getClientFeedbacks() {
    return axios.get(BACKEND_API + "/feedback");
  }

  getAllTests() {
    return axios.get(BACKEND_API + "/tests");
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
}

export default new Services();
