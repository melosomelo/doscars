import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Button from "../../components/Button/Button";
import { Context } from "../../Context/EthereumProvider";
import { EthereumContext } from "../../global";

const NoAccess: React.FC = () => {
  const { requestAccess, accessGranted } = useContext(
    Context
  ) as EthereumContext;

  if (accessGranted) {
    return <Redirect to="/" />;
  }

  return (
    <main className="error-message">
      <p>It appears you have denied access to our app.</p>
      <p>
        In order to use it, you must grant access to your Ethereum accounts
        info.
      </p>
      <Button onClick={() => requestAccess()}>Grant access</Button>
    </main>
  );
};

export default NoAccess;
