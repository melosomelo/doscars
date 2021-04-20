import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { EthereumProvider } from "./Context/EthereumProvider";
import Layout from "./components/Layout/Layout";

import Routes from "./routes";

function App() {
  return (
    <Router>
      <EthereumProvider>
        <Layout>
          <Routes />
        </Layout>
      </EthereumProvider>
    </Router>
  );
}

export default App;
