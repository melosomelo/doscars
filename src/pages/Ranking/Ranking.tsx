import React, { useState, useEffect, useContext } from "react";
import { Context as EthContext } from "../../Context/EthereumProvider";

import Loading from "../../components/Loading/Loading";

import "./styles.css";

const Ranking: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { state, contract } = useContext(EthContext);

  useEffect(() => {
    if (state !== "enlisting") {
      console.log("eai!");
    }
    setLoading(false);
  }, []);
  return (
    <>
      <h1 className="page-title fadeFromTop">RANKING</h1>
      {loading && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {loading && <Loading />}
        </div>
      )}
      {state === "enlisting" && !loading && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "3rem",
          }}
        >
          <p style={{ textAlign: "center" }}>
            The app is still in the enlisting stage.
          </p>
        </div>
      )}
    </>
  );
};

export default Ranking;
