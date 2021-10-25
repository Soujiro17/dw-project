import React, { useEffect } from "react";
import { SolicitudesDashboardTable, Layout } from "../../components";
import axiosInstance from "../../services/axiosInstance";
import "./SolicitudesDashboard.scss";

export interface Solicitud {
  Id_solicitud: number;
  Rut: number;
  Fecha_solicitud: string;
  Monto: number;
  Aprobado: number;
}

const SolicitudesDashboard = () => {
  const [solicitudes, setSolicitudes] = React.useState<Solicitud[]>([]);

  const getSolicitudes = async () => {
    await axiosInstance.get<Solicitud[]>("/customer/solicitudes").then((res) => {
      setSolicitudes(res.data);
    });
  };

  useEffect(() => {
    getSolicitudes();
  }, []);

  return (
    <Layout>
      <div className="admin-dashboard">
        <SolicitudesDashboardTable solicitudes={solicitudes} />
      </div>
    </Layout>
  );
};

export default SolicitudesDashboard;
