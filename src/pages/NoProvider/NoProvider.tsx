import React from "react";
import "./styles.css";

const NoProvider: React.FC = () => {
  return (
    <main className="error-message">
      <p>We were not able to find any web3 providers in your browser</p>
      <p>
        To use our app, you must install one. We recommend{" "}
        <a
          href="https://metamask.io/"
          target="_blank"
          className="metamask"
          rel="noreferrer"
        >
          MetaMask
        </a>
        .
      </p>
    </main>
  );
};

export default NoProvider;
