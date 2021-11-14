import React from "react";
import { Solicitud } from "../../pages/SolicitudesDashboard/SolicitudesDashboard";
import { DateTime } from "luxon";
import "./SolicitudesDashboardItems.scss";
import { format } from "rut.js";

const SolicitudesDashboardItems: React.FC<{
  solicitud: Solicitud;
  defaultItem: Boolean;
}> = ({ solicitud, defaultItem }) => {
  if (defaultItem) {
    return (
      <div className="solicitud-item">
        <div className="solicitud-id default">ID Solicitud</div>
        <div className="solicitud-rut default">Rut</div>
        <div className="solicitud-fecha default">Fecha de solicitud</div>
        <div className="solicitud-monto default">Monto solicitado</div>
        <div className="solicitud-status default">Estado</div>
      </div>
    );
  }

  return (
    <div className="solicitud-item">
      <div className="solicitud-id">{solicitud.Id_solicitud}</div>
      <div className="solicitud-rut">{format(solicitud.Rut.toString())}</div>
      <div className="solicitud-fecha">
        {DateTime.fromISO(solicitud.Fecha_solicitud).toFormat("yyyy LLL dd")}
      </div>
      <div className="solicitud-monto">
        $
        {solicitud.Monto.toLocaleString(undefined, {
          style: "currency",
          currency: "CLP",
        })}
      </div>
      {solicitud.Aprobado === 1 ? (
        <div className="solicitud-status" style={{ color: "rgb(0, 166, 223)" }}>
          Aprobado
        </div>
      ) : solicitud.Aprobado === 0 ? (
        <div className="solicitud-status" style={{ color: "#e3007d" }}>
          Rechazado
        </div>
      ) : (
        <div className="solicitud-status" style={{ color: "#27272788" }}>
          Pendiente
        </div>
      )}
    </div>
  );
};

export default SolicitudesDashboardItems;
