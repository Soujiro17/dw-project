import React, { useEffect } from "react";
import { AdminDashboardTable, Layout } from "../../components";
import axiosInstance from "../../services/axiosInstance";
import "./AdminDashboard.scss";

export interface Solicitud {
  Id_solicitud: number;
  Fecha_solicitud: string;
  Nombres: string;
  Apellidos: string;
  Rut: Number;
  Telefono: Number;
  Email: string;
  Monto: Number;
}

const AdminDashboard = () => {
  const [solicitudes, setSolicitudes] = React.useState<Solicitud[]>([]);

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
        <AdminDashboardTable solicitudes={solicitudes} />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
