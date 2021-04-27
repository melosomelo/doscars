import React, { useContext } from "react";
import logoSVG from "../../assets/images/logo.svg";
import Button from "../../components/Button/Button";
import { Context } from "../../Context/EthereumProvider";

import "./styles.css";

const Home: React.FC = () => {
  const { participate } = useContext(Context);
  return (
    <main className="home">
      <div className="main-title">
        <h1>D'OSCARS</h1>
        <img src={logoSVG} alt="D'oscars' logo" />
      </div>
      <p>Decentralized voting for movies</p>
      <Button onClick={participate}>Participate</Button>
    </main>
  );
};

export default Home;
