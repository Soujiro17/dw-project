import React from "react";
import { Solicitud } from "../../pages/SolicitudesDashboard/SolicitudesDashboard";
import { DateTime } from "luxon";
import "./SolicitudesDashboardItems.scss";


const SolicitudesDashboardItems: React.FC<{solicitud:Solicitud}> = ({solicitud}) => {
  return (
    <tr key={solicitud.Id_solicitud}>
      <td>
        {DateTime.fromISO(solicitud.Fecha).toFormat("yyyy LLL dd")}
      </td>
      <td>{solicitud.Rut}</td>
      <td>{solicitud.Aprobado}</td>
      <td>
        $
        {solicitud.Monto.toLocaleString(undefined, {
          style: "currency",
          currency: "CLP",
        })}
      </td>
    </tr>
  );
};

export default SolicitudesDashboardItems;
