import React, { useContext } from "react";
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";

import { Context as EthereumContext } from "./Context/EthereumProvider";

import Home from "./pages/Home/Home";

interface CustomRouteProps extends RouteProps {
  requiresProvider?: boolean;
  requiresAccess?: boolean;
}

const CustomRoute: React.FC<CustomRouteProps> = ({
  requiresAccess,
  requiresProvider,
  ...rest
}) => {
  const { accessGranted, providerFound } = useContext(
    EthereumContext
  ) as EthereumContext;

  if (requiresProvider && !providerFound) {
    return <Redirect to="no-provider" />;
  }
  if (requiresAccess && !accessGranted) {
    return <Redirect to="/no-access" />;
  }

  return <Route {...rest} />;
};

const Routes: React.FC = () => {
  return (
    <Switch>
      <CustomRoute exact path="/">
        <Home />
      </CustomRoute>
      <CustomRoute></CustomRoute>
    </Switch>
  );
};

export default Routes;
