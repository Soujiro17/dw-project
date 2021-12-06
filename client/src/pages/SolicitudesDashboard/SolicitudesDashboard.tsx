import React, { useEffect } from "react";
import {
  SolicitudesDashboardItems,
  Layout,
  DashboardAsideNav,
  DashboardAsideInfo,
} from "../../components";
import axiosInstance from "../../services/axiosInstance";
import "./SolicitudesDashboard.scss";

export interface Solicitud {
  Id_solicitud: number;
  Rut: number;
  Fecha_solicitud: string;
  Monto: number;
  Aprobado: number;
}

const defaultSolicitud: Solicitud = {
  Id_solicitud: 0,
  Rut: 0,
  Fecha_solicitud: "",
  Monto: 0,
  Aprobado: 0,
};

const SolicitudesDashboard = () => {
  const [solicitudes, setSolicitudes] = React.useState<Solicitud[]>([]);

  const getSolicitudes = async () => {
    if (process.env.REACT_APP_MONGO) {
      await axiosInstance
        .get<Solicitud[]>("/customerMongo/solicitudes")
        .then((res) => {
          setSolicitudes(res.data);
        });
    } else {
      await axiosInstance
        .get<Solicitud[]>("/customer/solicitudes")
        .then((res) => {
          setSolicitudes(res.data);
        });
    }
  };

  useEffect(() => {
    getSolicitudes();
  }, []);

  return (
    <Layout>
      <div className="solicitudes-dashboard">
        <DashboardAsideNav />
        <div className="solicitudes">
          <SolicitudesDashboardItems
            solicitud={defaultSolicitud}
            defaultItem={true}
          />
          {solicitudes?.map((solicitud) => {
            return (
              <SolicitudesDashboardItems
                solicitud={solicitud}
                defaultItem={false}
              />
            );
          })}
        </div>
        <DashboardAsideInfo />
      </div>
    </Layout>
  );
};

export default SolicitudesDashboard;
