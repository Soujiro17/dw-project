import React, { ReactElement, useContext } from "react";
import { Header, Footer, UserContext } from "..";
interface Props {
  children: ReactElement;
}

const Layout = (props: Props) => {
  const { usuario } = useContext(UserContext);

  return (
    <>
      <Header usuario={usuario} />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
