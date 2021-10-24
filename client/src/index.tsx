import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider, UserContextProvider } from "./components";
import "./index.scss";
import Routes from "./routes/Routes";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <AuthContextProvider>
    <UserContextProvider>
      <Routes />
      <ToastContainer
        autoClose={3000}
        closeOnClick
        position="top-left"
        pauseOnHover={false}
      />
    </UserContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
