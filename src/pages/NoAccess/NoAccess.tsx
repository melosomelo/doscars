import React from "react";
import Button from "../../components/Button/Button";

const NoAccess: React.FC = () => {
  return (
    <main className="error-message">
      <p>It appears you have denied access to our app.</p>
      <p>
        In order to use it, you must grant access to your Ethereum accounts
        info.
      </p>
      <Button>Grant access</Button>
    </main>
  );
};

export default NoAccess;
