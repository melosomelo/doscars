import React, { useContext } from "react";
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";

import { Context } from "./Context/EthereumProvider";

import Home from "./pages/Home/Home";
import NoProvider from "./pages/NoProvider/NoProvider";
import NoAccess from "./pages/NoAccess/NoAccess";
import Enlist from "./pages/Enlist/Enlist";
import EnlistedMovies from "./pages/EnlistedMovies/EnlistedMovies";
import Ranking from "./pages/Ranking/Ranking";
import Feed from "./pages/Feed/Feed";
import Wfw from "./pages/Wfw/Wfw";
import Over from "./pages/Over/Over";

import Loading from "./components/Loading/Loading";

import { EthereumContext } from "./global";

interface CustomRouteProps extends RouteProps {
  requiresProvider?: boolean;
  requiresAccess?: boolean;
}

const CustomRoute: React.FC<CustomRouteProps> = ({
  requiresAccess,
  requiresProvider,
  ...rest
}) => {
  const { accessGranted, providerFound, loading } = useContext(
    Context
  ) as EthereumContext;

  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: "50%",
        }}
      >
        <Loading />
      </div>
    );
  }

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
      <CustomRoute exact path="/" requiresAccess requiresProvider>
        <Home />
      </CustomRoute>
      <CustomRoute exact path="/no-provider">
        <NoProvider />
      </CustomRoute>
      <CustomRoute exact path="/no-access">
        <NoAccess />
      </CustomRoute>
      <CustomRoute exact path="/enlist" requiresAccess requiresProvider>
        <Enlist />
      </CustomRoute>
      <CustomRoute exact path="/enlisted" requiresAccess requiresProvider>
        <EnlistedMovies />
      </CustomRoute>
      <CustomRoute exact path="/ranking" requiresAccess requiresProvider>
        <Ranking />
      </CustomRoute>
      <CustomRoute exact path="/feed" requiresAccess requiresProvider>
        <Feed />
      </CustomRoute>
      <CustomRoute exact path="/wfw" requiresAccess requiresProvider>
        <Wfw />
      </CustomRoute>
      <CustomRoute exact path="/over" requiresAccess requiresProvider>
        <Over />
      </CustomRoute>
    </Switch>
  );
};

export default Routes;
