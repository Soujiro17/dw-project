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

  const getLoggedIn = async () => {
    await axiosInstance.get<Boolean>("auth/loggedIn").then((res) => {
      setLoggedIn(res.data);
    });
  };

  const cerrarSesion = async () => {
    await axiosInstance.get("auth/logout");
  };

  useEffect(() => {
    getLoggedIn();
  });

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export { AuthContextProvider };
