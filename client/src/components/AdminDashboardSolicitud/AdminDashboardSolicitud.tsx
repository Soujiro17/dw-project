import React from "react";
import { Solicitud } from "../../pages/AdminDashboard/AdminDashboard";
import { DateTime } from "luxon";
import "./AdminDashboardSolicitud.scss";

import { format } from "rut.js";

const AdminDashboardSolicitud: React.FC<{
  solicitud: Solicitud;
  handleRequestStatus: (solicitud: Solicitud, boolean: Boolean) => void;
  defaultItem: Boolean;
}> = ({ solicitud, handleRequestStatus, defaultItem }) => {
  if (defaultItem) {
    return (
      <div className="solicitud-item">
        <div className="solicitud-id default">ID Solicitud</div>
        <div className="solicitud-fecha default">Fecha de solicitud</div>
        <div className="solicitud-rut default">Nombres</div>
        <div className="solicitud-rut default">Apellidos</div>
        <div className="solicitud-rut default">Rut</div>
        <div className="solicitud-monto default">Teléfono</div>
        <div className="solicitud-monto default">Email</div>
        <div className="solicitud-monto default">Monto solicitado</div>
        <div className="solicitud-status default">Aprobar/rechazar</div>
      </div>
    );
  }

  return (
    <div className="solicitud-item">
      <div className="solicitud-id">{solicitud.Id_solicitud}</div>
      <div className="solicitud-fecha">
        {DateTime.fromISO(solicitud.Fecha_solicitud).toFormat("yyyy LLL dd")}
      </div>
      <div className="solicitud-nombnres">{solicitud.Nombres}</div>
      <div className="solicitud-apellidos">{solicitud.Apellidos}</div>
      <div className="solicitud-rut">{format(solicitud.Rut.toString())}</div>
      <div className="solicitud-telefono">{solicitud.Telefono}</div>
      <div className="solicitud-email">{solicitud.Email}</div>
      <div className="solicitud-monto">
        $
        {solicitud.Monto.toLocaleString(undefined, {
          style: "currency",
          currency: "CLP",
        })}
      </div>
      <div className="solicitud-aprobarorechazar">
        <button
          className="btn"
          onClick={() => handleRequestStatus(solicitud, true)}
        >
          Aprobar
        </button>
        <button
          className="btn rosado"
          onClick={() => handleRequestStatus(solicitud, false)}
        >
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardSolicitud;
