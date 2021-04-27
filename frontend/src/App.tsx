import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { EthereumProvider } from "./Context/EthereumProvider";
import { SnackbarProvider } from "./Context/SnackbarProvider";
import Layout from "./components/Layout/Layout";

import Routes from "./routes";

function App() {
  return (
    <Router>
      <SnackbarProvider>
        <EthereumProvider>
          <Layout>
            <Routes />
          </Layout>
        </EthereumProvider>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
