import React, { useState, useEffect, useContext } from "react";
import "./LoginForm.scss";
import { icons } from "../../consts/icons";
import { EyeOpened, EyeClosed, AuthContext, UserContext } from "..";
import { validate, format, clean } from "rut.js";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [showContraseña, setShowContraseña] = useState<Boolean>(false);
  const [Rut, setRut] = useState<string>("");
  const [RutIsCorrect, setRutIsCorrect] = useState<Boolean>(false);
  const [Contraseña, setContraseña] = useState<string>("");

  const { getLoggedIn } = useContext(AuthContext);
  const { getCustomer } = useContext(UserContext);

  const handleLogin = async (ev: React.MouseEvent) => {
    ev.preventDefault();
    await axiosInstance
      .post("auth/login", { Rut: clean(Rut), Contraseña })
      .then((res) => {
        toast.success("Sesión iniciada con éxito");
        getLoggedIn();
        getCustomer();
      })
      .catch((err) =>
        toast.error(
          "Error al iniciar sesión. Por favor, verifica bien tus datos"
        )
      );
  };

  useEffect(() => {
    setRutIsCorrect(validate(Rut));
  }, [Rut]);

  return (
    <form className="login-form">
      <label htmlFor="Rut">Tu Rut</label>
      <div className="field">
        {icons.user}
        <input
          maxLength={12}
          name="Rut"
          type="text"
          className="input"
          onChange={(e) => setRut(format(e.target.value))}
          value={Rut}
          required
        />
        {RutIsCorrect ? icons.check : icons.equis}
      </div>
      <label htmlFor="Contraseña">Clave</label>
      <div className="field">
        {icons.password}
        <input
          name="Contraseña"
          type={showContraseña ? "text" : "password"}
          className="input"
          onChange={(e) => setContraseña(e.target.value)}
          value={Contraseña}
          required
        />
        {showContraseña ? (
          <EyeOpened
            showContraseña={showContraseña}
            setShowContraseña={setShowContraseña}
          />
        ) : (
          <EyeClosed
            showContraseña={showContraseña}
            setShowContraseña={setShowContraseña}
          />
        )}
      </div>
      <button
        className="btn-submit"
        onClick={(ev: React.MouseEvent) => handleLogin(ev)}
      >
        Iniciar sesion
      </button>
    </form>
  );
};

export default LoginForm;
