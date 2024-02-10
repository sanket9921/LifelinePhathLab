import { createBrowserRouter } from "react-router-dom";
import App from "./Admin/App";
import Content from "./Admin/Content";
import Dashboard from "./Admin/Dashboard";
import Appointments from "./Admin/Appointments";
import TestBook from "./Admin/TestBook";
import Patients from "./Admin/Users/Patients";
import Doctors from "./Admin/Users/Doctors";
import Admin from "./Admin/Users/Admin";
import AddTest from "./Admin/Tests/AddTest";
import AllTest from "./Admin/Tests/AllTest";
import AddDoctor from "./Admin/Users/AddDoctor";

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "appointments",
        element: <Appointments />,
      },
      {
        path: "testBookings",
        element: <TestBook />,
      },
      {
        path: "patients",
        element: <Patients />,
      },
      {
        path: "doctors",
        element: <Doctors />,
      },
      {
        path: "admins",
        element: <Admin />,
      },
      {
        path: "addtest",
        element: <AddTest />,
      },
      {
        path: "allTest",
        element: <AllTest />,
      },
      {
        path: "addDoctor",
        element: <AddDoctor />,
      },
    ],
  },
]);

export default adminRouter;
