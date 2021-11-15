import React, { useContext, useEffect } from "react";
import { AuthContext, Layout, LoginCard } from "../../components";
import "./Login.scss";
import fotoLogin from "../../assets/foto-login.jpg";
import { useHistory } from "react-router";

const Login = () => {
  const { loggedIn, loggedInAdmin } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) return history.push("/dashboard");
    else if (loggedInAdmin) return history.push("/admin");
  }, [loggedIn, loggedInAdmin, history]);

  return (
    <Layout>
      <div className="login-container">
        <div className="login-card-container">
          <LoginCard />
        </div>
        <div className="login-image">
          <img src={fotoLogin} alt="foto-login"></img>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
