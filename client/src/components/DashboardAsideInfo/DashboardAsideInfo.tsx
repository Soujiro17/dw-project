import React, { useContext } from "react";
import { UserContext } from "..";
import "./DashboardAsideInfo.scss";
import { format } from "rut.js";

const DashboardAsideInfo = () => {
  const { usuario } = useContext(UserContext);

  console.log(usuario);

  return (
    <div className="aside-right">
      <div className="info-title">
        <h3>Información de la cuenta</h3>
      </div>
      <div className="info-content">
        <div className="info-item">
          <h4>Nombres</h4>
          <p>{usuario.Nombres}</p>
        </div>
        <div className="info-item">
          <h4>Apellidos</h4>
          <p>{usuario.Apellidos}</p>
        </div>
        <div className="info-item">
          <h4>Rut</h4>
          <p>{format(usuario.Rut.toString())}</p>
        </div>
        <div className="info-item">
          <h4>Saldo</h4>
          <p>
            $
            {usuario.Saldo.toLocaleString(undefined, {
              style: "currency",
              currency: "CLP",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardAsideInfo;
