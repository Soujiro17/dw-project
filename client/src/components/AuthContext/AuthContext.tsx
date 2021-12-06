import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface LoggedIn {
  typeAccount: string;
  loggedIn: boolean;
}
interface Context {
  loggedIn: Boolean;
  loggedInAdmin: Boolean;
  getLoggedIn: () => void;
  cerrarSesion: (typeAccount: string) => void;
  getLoggedInAdmin: () => void;
}

const AuthContext = createContext<Context>({} as Context);

const AuthContextProvider = ({ children }: Props) => {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);
  const [loggedInAdmin, setLoggedInAdmin] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);

  const getLoggedIn = async () => {
    setLoading(true);
    if (process.env.REACT_APP_MONGO) {
      await axiosInstance.get<LoggedIn>("authMongo/loggedIn").then((res) => {
        console.log(res.data);
        setLoggedIn(res.data.loggedIn);
      });
    } else {
      await axiosInstance.get<LoggedIn>("auth/loggedIn").then((res) => {
        setLoggedIn(res.data.loggedIn);
      });
    }
    setLoading(false);
  };

  const getLoggedInAdmin = async () => {
    setLoading(true);
    if (process.env.REACT_APP_MONGO) {
      await axiosInstance.get<LoggedIn>("adminMongo/loggedIn").then((res) => {
        setLoggedInAdmin(res.data.loggedIn);
      });
    } else {
      await axiosInstance.get<LoggedIn>("admin/loggedIn").then((res) => {
        setLoggedInAdmin(res.data.loggedIn);
      });
    }
    setLoading(false);
  };

  const cerrarSesion = async (typeAccount: string) => {
    setLoading(true);
    if (typeAccount === "admin") {
      if (process.env.REACT_APP_MONGO) {
        await axiosInstance.get("adminMongo/logout");
      } else {
        await axiosInstance.get("admin/logout");
      }
    } else {
      if (process.env.REACT_APP_MONGO) {
        await axiosInstance.get("authMongo/logout");
      } else {
        await axiosInstance.get("auth/logout");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getLoggedIn();
    getLoggedInAdmin();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        getLoggedIn,
        cerrarSesion,
        loggedInAdmin,
        getLoggedInAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export { AuthContextProvider };
