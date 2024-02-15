import axios from "axios";
const BACKEND_API = "http://localhost:8083/api";
class Services {
  userRegistration(user) {
    return axios.post(BACKEND_API + "/user", user);
  }

  addClientFeedback(clientFeedback) {
    return axios.post(BACKEND_API + "/feedback", clientFeedback);
  }
}

export default new Services();
