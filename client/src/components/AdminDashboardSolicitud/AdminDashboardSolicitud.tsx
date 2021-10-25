import React from "react";
import { Solicitud } from "../../pages/AdminDashboard/AdminDashboard";
import { DateTime } from "luxon";
import "./AdminDashboardSolicitud.scss";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";


const AdminDashboardSolicitud: React.FC<{solicitud:Solicitud;  eliminarSolicitud: () => void }> = ({solicitud, eliminarSolicitud}) => {

  const AprobationOfSolicitud = async (boolean: Boolean) =>{
    await axiosInstance
    .put("customer/actualizarSolicitud", {
      rutCliente: solicitud.Rut, atributos: { Aprobado: boolean } },
    )
    .then((res) => {
      toast.success("Solicitud Actualizada");
      console.log(res);
    })
    .catch((err) =>
      toast.error(
        `${err}`
      )
    );
    eliminarSolicitud();
  }

  return (
    <tr key={solicitud.Id_solicitud}>
      <td>{solicitud.Id_solicitud}</td>
      <td>
        {DateTime.fromISO(solicitud.Fecha_solicitud).toFormat("yyyy LLL dd")}
      </td>
      <td>{solicitud.Nombres}</td>
      <td>{solicitud.Apellidos}</td>
      <td>{solicitud.Rut}</td>
      <td>{solicitud.Telefono}</td>
      <td>{solicitud.Email}</td>
      <td>
        $
        {solicitud.Monto.toLocaleString(undefined, {
          style: "currency",
          currency: "CLP",
        })}
      </td>
      <td>
        <button className="btn aprobar" onClick={() => AprobationOfSolicitud(true)}>Aprobar</button>
        <button className="btn rechazar" onClick={() => AprobationOfSolicitud(false)}>Rechazar</button>
      </td>
    </tr>
  );
};

export default AdminDashboardSolicitud;
