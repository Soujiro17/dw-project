import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface Context {
  loggedIn: Boolean;
  getLoggedIn: () => void;
  cerrarSesion: () => void;
}

const AuthContext = createContext<Context>({} as Context);

const AuthContextProvider = ({ children }: Props) => {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);

  const getLoggedIn = async () => {
    setLoading(true);
    await axiosInstance.get<Boolean>("auth/loggedIn").then((res) => {
      setLoggedIn(res.data);
    });
    setLoading(false);
  };

  const cerrarSesion = async () => {
    setLoading(true);
    await axiosInstance.get("auth/logout");
    setLoading(false);
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export { AuthContextProvider };
