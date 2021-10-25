import React, { useEffect } from "react";
import { AdminDashboardTable, Layout } from "../../components";
import axiosInstance from "../../services/axiosInstance";
import "./AdminDashboard.scss";

export interface Solicitud {
  Id_solicitud: number;
  Fecha_solicitud: string;
  Nombres: string;
  Apellidos: string;
  Rut: number;
  Telefono: number;
  Email: string;
  Monto: number;
}

const AdminDashboard = () => {
  const [solicitudes, setSolicitudes] = React.useState<Solicitud[]>([]);

  const deleteItemHandler = (solicitudId: number) => {
    console.log("a")
    setSolicitudes(prevGoals => {
      const updateSolicitudes = prevGoals.filter(solicitud => solicitud.Id_solicitud !== solicitudId);
      return updateSolicitudes;
    });
  };

  const getSolicitudes = async () => {
    await axiosInstance.get<Solicitud[]>("/api/solicitudes").then((res) => {
      setSolicitudes(res.data);
    });
  };

  useEffect(() => {
    getSolicitudes();
  }, []);

  return (
    <Layout>
      <div className="admin-dashboard">
        <AdminDashboardTable solicitudes={solicitudes} eliminarSolicitud={deleteItemHandler}/>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
