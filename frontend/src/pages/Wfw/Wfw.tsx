import React, { useContext } from "react";
import { Redirect } from "react-router";
import { Context } from "../../Context/EthereumProvider";

import "./styles.css";

const Wfw: React.FC = () => {
  const { state } = useContext(Context);

  if (state !== "wfw") {
    return <Redirect to="/" />;
  }

  return (
    <div className="wfw-container">
      <p className="fadeFromTop">
        We are currently waiting for the winner to be declared.
      </p>
      <p className="fadeFromTop">Hold on tight.</p>
    </div>
  );
};

export default Wfw;
