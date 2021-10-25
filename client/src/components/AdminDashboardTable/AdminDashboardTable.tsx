import React from "react";
import { AdminDashboardSolicitud } from "..";
import { Solicitud } from "../../pages/AdminDashboard/AdminDashboard";
import "./AdminDashboardTable.scss";


const AdminDashboardTable: React.FC<{ solicitudes: Solicitud[]; eliminarSolicitud: (solicitudId: number) => void}> = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID Solicitud</th>
          <th>Fecha de solicitud</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Rut</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Monto</th>
          <th>Aprobar/Rechazar</th>
        </tr>
      </thead>
      <tbody>
        {props.solicitudes?.map((solicitud) => {
          return (
            <AdminDashboardSolicitud
              solicitud={solicitud}
              eliminarSolicitud={props.eliminarSolicitud.bind(null, solicitud.Id_solicitud)}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default AdminDashboardTable;
