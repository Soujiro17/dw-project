import React from "react";
import { LoginCardBody, LoginCardHeader } from "..";
import "./LoginCard.scss";

const LoginCard = () => {
  return (
    <div className="login-card">
      <LoginCardHeader />
      <LoginCardBody />
    </div>
  );
};

export default LoginCard;
