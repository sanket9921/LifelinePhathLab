import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./component/Home";
import BookTest from "./component/BookTest";
import UploadPrescription from "./component/UploadPrescription";
import DownloadReport from "./component/DownloadReport";
import Contact from "./component/Contact";
import Cart from "./component/Cart";
import Login from "./component/Login";
import Signup from "./component/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "bookTest",
        element: <BookTest />,
      },
      {
        path: "uploadPrescription",
        element: <UploadPrescription />,
      },
      {
        path: "downloadReport",
        element: <DownloadReport />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },

  
]);

export default router;
