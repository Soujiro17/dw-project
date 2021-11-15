import React, { useContext } from "react";
import "./Header.scss";
import { Usuario } from "../UserContext/UserContext";
import { icons } from "../../consts/icons";
import { AuthContext } from "..";
import { useHistory } from "react-router";

interface Props {
  usuario: Usuario;
}

const url =
  "https://www.uv.cl/universidad/descargas/archivos/uv_logo_alta_rgba_azul.png";

const Header = (props: Props) => {
  const { cerrarSesion } = useContext(AuthContext);

  const history = useHistory();

  return (
    <header>
      <>
        <div className="left-container">
          <img src={url} alt="" onClick={() => history.push("/dashboard")} />
        </div>
        {props.usuario.Nombres && (
          <div className="rigth-container">
            <div className="sesion">
              <div className="info">
                <p>Hola</p>
                <p>
                  <strong>{props.usuario.Nombres}</strong>
                </p>
              </div>
              <div
                className="iconos"
                onClick={() => {
                  cerrarSesion(props.usuario.typeAccount);
                  window.location.reload();
                }}
              >
                {icons.cerrarSesion}
                <p>Salir</p>
              </div>
            </div>
          </div>
        )}
      </>
    </header>
  );
};

export default Header;
