import React, { useEffect } from "react";
import { AdminDashboardSolicitud, Layout } from "../../components";
import axiosInstance from "../../services/axiosInstance";
import "./AdminDashboard.scss";
import { toast } from "react-toastify";

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

const defaultItem = {
  Id_solicitud: 0,
  Fecha_solicitud: "",
  Nombres: "",
  Apellidos: "",
  Rut: 0,
  Telefono: 0,
  Email: "",
  Monto: 0,
};

const AdminDashboard = () => {
  const [solicitudes, setSolicitudes] = React.useState<Solicitud[]>([]);

  const getSolicitudes = async () => {
   /*await axiosInstance.get<Solicitud[]>("/adminMongo/solicitudes").then((res) => {
      setSolicitudes(res.data);
    });*/
    await axiosInstance.get<Solicitud[]>("/admin/solicitudes").then((res) => {
      setSolicitudes(res.data);
    });
  };

  const handleRequestStatus = async (solicitud: Solicitud, boolean: Number) => {
    if (boolean) {
      if (!window.confirm("¿Estás seguro de aprobar la solicitud?")) return;
    } else {
      if (!window.confirm("¿Estás seguro de rechazar la solicitud?")) return;
    }
    await axiosInstance
      /*.put("customerMongo/actualizarSolicitud", {
        id: solicitud.Id_solicitud,
        atributos: { aprobado: boolean },
      })*/
      .put("customer/actualizarSolicitud", {
        id: solicitud.Id_solicitud,
        atributos: { Aprobado: boolean },
      })
      .then(async (res) => {
        toast.success("Solicitud Actualizada");
        await getSolicitudes();
        console.log(await getSolicitudes());
      })
      .catch((err) => toast.error(`${err}`));
  };

  useEffect(() => {
    getSolicitudes();
  }, []);

  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="solicitudes">
          <AdminDashboardSolicitud
            solicitud={defaultItem}
            handleRequestStatus={handleRequestStatus}
            defaultItem={1}
          />

          {solicitudes.map((solicitud) => (
            <AdminDashboardSolicitud
              solicitud={solicitud}
              handleRequestStatus={handleRequestStatus}
              defaultItem={0}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
