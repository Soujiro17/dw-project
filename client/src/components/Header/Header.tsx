import React, { useContext } from "react";
import "./Header.scss";
import { Usuario } from "../UserContext/UserContext";
import { icons } from "../../consts/icons";
import { AuthContext } from "..";

interface Props {
  usuario: Usuario;
}

const Header = (props: Props) => {
  const { cerrarSesion } = useContext(AuthContext);

  return (
    <header>
      {props.usuario.Nombres ? (
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
              cerrarSesion();
              window.location.reload();
            }}
          >
            {icons.cerrarSesion}
            <p>Salir</p>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
