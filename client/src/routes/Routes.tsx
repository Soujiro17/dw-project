import React, { useContext } from "react";
import { Redirect } from "react-router";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import { AuthContext } from "../components";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import SolicitudesDashboard from "../pages/SolicitudesDashboard/SolicitudesDashboard";

const Routes = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <PrivateRoute
          path="/dashboard"
          isAuthenticated={loggedIn}
          component={Dashboard}
        />
        <PrivateRoute
          path="/solicitudes"
          isAuthenticated={loggedIn}
          component={SolicitudesDashboard}
        />
 
        {/* <PrivateRoute
          path="/solicitudes/realizar"
          isAuthenticated={loggedIn}
          component={Dashboard}
        /> */}
        <Route exact path="/admin">
          <AdminDashboard />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  );
};

const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default Routes;
