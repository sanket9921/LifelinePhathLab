import React from "react";
import ReactDOM from "react-dom/client";
import RouterComponent from "./RouterComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <RouterProvider router={router} /> */}
    <RouterComponent />
  </React.StrictMode>
);
