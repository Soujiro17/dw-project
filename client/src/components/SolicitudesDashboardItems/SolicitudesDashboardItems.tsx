import React, { useState, useEffect } from "react";
import { Solicitud } from "../../pages/SolicitudesDashboard/SolicitudesDashboard";
import { DateTime } from "luxon";
import "./SolicitudesDashboardItems.scss";


const SolicitudesDashboardItems: React.FC<{solicitud:Solicitud}> = ({solicitud}) => {
  const [ estado, setEstado ] = useState<string>();
  
  useEffect(() => {
    
    if(solicitud.Aprobado === 1){
      setEstado("Aprobado");
    }else if(solicitud.Aprobado === 0){
      setEstado("Rechazado");
    }else{
      setEstado("Pendiente");
    }
  }, [solicitud.Aprobado]);

  return (
    <tr key={solicitud.Id_solicitud}>
      <td>{solicitud.Id_solicitud}</td>
      <td>{solicitud.Rut}</td>
      <td>
        {DateTime.fromISO(solicitud.Fecha_solicitud).toFormat("yyyy LLL dd")}
      </td>
      <td>
        $
        {solicitud.Monto.toLocaleString(undefined, {
          style: "currency",
          currency: "CLP",
        })}
      </td>
      <td>{estado}</td>
    </tr>
  );
};

export default SolicitudesDashboardItems;
