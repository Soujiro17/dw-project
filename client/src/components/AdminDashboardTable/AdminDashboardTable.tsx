import React from "react";
import { AdminDashboardSolicitud } from "..";
import { Solicitud } from "../../pages/AdminDashboard/AdminDashboard";
import "./AdminDashboardTable.scss";

interface Props {
  solicitudes: Solicitud[];
}

const AdminDashboardTable = (props: Props) => {
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
              Id_solicitud={solicitud.Id_solicitud}
              Fecha_solicitud={solicitud.Fecha_solicitud}
              Nombres={solicitud.Nombres}
              Apellidos={solicitud.Apellidos}
              Rut={solicitud.Rut}
              Telefono={solicitud.Telefono}
              Email={solicitud.Email}
              Monto={solicitud.Monto}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default AdminDashboardTable;
