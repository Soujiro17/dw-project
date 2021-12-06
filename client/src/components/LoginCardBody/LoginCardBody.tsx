import React, { useState } from "react";
import "./LoginCardBody.scss";
import { LoginForm } from "..";

const LoginCardBody = () => {
  const [typeAccount, setTypeAccount] = useState<string>("cliente");

  return (
    <div className="login-body">
      <div className="title-login">
        <h2>Entra a tu cuenta AFP</h2>
        <label htmlFor="html">Ejecutivo</label>
        <input
          type="radio"
          name="admin"
          value="admin"
          checked={typeAccount === "admin"}
          onChange={() => setTypeAccount("admin")}
        />
        <label htmlFor="html">Cliente</label>
        <input
          type="radio"
          name="cliente"
          value="cliente"
          checked={typeAccount === "cliente"}
          onChange={() => setTypeAccount("cliente")}
        />
      </div>
      <LoginForm typeAccount={typeAccount} />
    </div>
  );
};

export default LoginCardBody;
