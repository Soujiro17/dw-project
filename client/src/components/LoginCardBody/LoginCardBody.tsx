import React from "react";
import "./LoginCardBody.scss";
import { LoginForm } from "..";

const LoginCardBody = () => {
  return (
    <div className="login-body">
      <div className="title-login">
        <h2>Entra a tu cuenta AFP</h2>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginCardBody;
