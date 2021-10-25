import React from "react";
import { SolicitudesDashboardItems } from "..";
import { Solicitud } from "../../pages/SolicitudesDashboard/SolicitudesDashboard";
import "./SolicitudesDashboardTable.scss";

const SolicitudesDashboardTable: React.FC<{ solicitudes: Solicitud[] }> = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Rut</th>
          <th>Fecha</th>
          <th>Monto</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {props.solicitudes?.map((solicitud) => {
          return (
            <SolicitudesDashboardItems
              solicitud={solicitud}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default SolicitudesDashboardTable;
