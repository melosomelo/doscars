import React, { useContext } from "react";
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";

import { Context as EthereumContext } from "./Context/EthereumProvider";

import Home from "./pages/Home/Home";
import NoProvider from "./pages/NoProvider/NoProvider";
import NoAccess from "./pages/NoAccess/NoAccess";

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

  if (requiresAccess && !accessGranted) {
    return <Redirect to="/no-access" />;
  }

  if (requiresProvider && !providerFound) {
    return <Redirect to="no-provider" />;
  }

  return <Route {...rest} />;
};

const Routes: React.FC = () => {
  return (
    <Switch>
      <CustomRoute exact path="/" requiresAccess requiresProvider>
        <Home />
      </CustomRoute>
      <CustomRoute exact path="/no-provider">
        <NoProvider />
      </CustomRoute>
      <CustomRoute exact path="/no-access">
        <NoAccess />
      </CustomRoute>
    </Switch>
  );
};

export default Routes;
