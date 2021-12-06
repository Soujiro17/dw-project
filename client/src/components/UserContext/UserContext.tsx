import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";

interface Context {
  usuario: Usuario;
  getCustomer: () => void;
}

export interface Usuario {
  Nombres: string;
  Apellidos: string;
  Rut: Number;
  Saldo: number;
  typeAccount: string;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const userDefault: Usuario = {
  Nombres: "",
  Apellidos: "",
  Rut: 0,
  Saldo: 0,
  typeAccount: "",
};

const UserContext = createContext<Context>({} as Context);

const UserContextProvider = ({ children }: Props) => {
  const [usuario, setUsuario] = useState<Usuario>(userDefault);

  const getCustomer = async () => {
    await axiosInstance.get<Usuario>("customerMongo/info").then((res) => {
      setUsuario(res.data);
    });
    /*await axiosInstance.get<Usuario>("customer/info").then((res) => {
      setUsuario(res.data);
    });*/
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <UserContext.Provider value={{ usuario, getCustomer }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserContextProvider };
