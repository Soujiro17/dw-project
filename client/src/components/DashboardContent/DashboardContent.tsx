import React, { useContext } from "react";
import { UserContext } from "..";
import "./DashboardContent.scss";

const DashboardContent = () => {
  const { usuario } = useContext(UserContext);

  return (
    <div className="content">
      <div className="tus-lucas">
        <span id="tus">TUS</span>
        <span id="lucas"> LUCAS</span>
      </div>
      <div className="content-body">
        <div className="lucas-ahorradas">
          Lucas ahorradas
          <span id="saldo">
            $
            {usuario.Saldo.toLocaleString(undefined, {
              style: "currency",
              currency: "CLP",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
