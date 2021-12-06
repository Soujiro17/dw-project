import React, { useContext, useState } from "react";
import { Layout, UserContext } from "../../components";
import { icons } from "../../consts/icons";
import "./SolicitarRetiro.scss";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axiosInstance";
import { useHistory } from "react-router";

const SolicitarRetiro = () => {
  const { usuario, getCustomer } = useContext(UserContext);

  const [monto, setMonto] = useState<string>("");

  const history = useHistory();

  const handleMonto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (usuario.Saldo <= 1000000 && parseInt(e.target.value) <= usuario.Saldo) {
      setMonto(e.target.value);
    } else if (parseInt(e.target.value) > usuario.Saldo * 0.1) {
      return;
    } else {
      setMonto(e.target.value);
    }
  };

  const enviarSolicitud = async () => {
    if (monto === "") {
      toast.error("Debe ingresar un monto");
      return;
    }

    if (process.env.REACT_APP_MONGO) {
      await axiosInstance
        .post("customerMongo/crearSolicitud", { Monto: monto })
        .then(() => {
          getCustomer();
          history.push("/dashboard");
          toast.success("Solicitud enviada");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      await axiosInstance
        .post("customer/crearSolicitud", { Monto: monto })
        .then(() => {
          getCustomer();
          history.push("/dashboard");
          toast.success("Solicitud enviada");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const cancelarSolicitud = () => {
    return history.push("/dashboard");
  };

  return (
    <Layout>
      <div className="solicitar-retiro">
        <div className="solicitar-container">
          <div className="solicitar-title">
            <h2>INICIA TUS RETIROS DEL 10%</h2>
            <p>Todos los campos con (*) son obligatorios</p>
            <h4>
              Saldo: ${" "}
              {usuario.Saldo.toLocaleString(undefined, {
                style: "currency",
                currency: "CLP",
              })}
            </h4>
          </div>
          <div className="solicitud-formulario">
            <label htmlFor="monto">
              <span className="red">*</span> Cantidad a retirar:
            </label>
            <div className="field">
              {icons.money}
              <input
                className="input"
                type="text"
                name="monto"
                required
                onChange={(e) => handleMonto(e)}
                value={monto}
              />
            </div>
          </div>
          <button
            className="btn"
            style={{ margin: "0" }}
            onClick={enviarSolicitud}
          >
            Enviar
          </button>
          <button className="btn rosado" onClick={cancelarSolicitud}>
            Cancelar
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SolicitarRetiro;
