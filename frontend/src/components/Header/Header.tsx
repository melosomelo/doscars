import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Button from "../Button/Button";
import { Context } from "../../Context/EthereumProvider";

import logoSVG from "../../assets/images/logo.svg";
import togglerSVG from "../../assets/images/toggler.svg";

import "./styles.css";

interface Props {
  openSidedrawer: () => void;
}

const Header: React.FC<Props> = ({ openSidedrawer }) => {
  const { participate } = useContext(Context);
  return (
    <header>
      <Link to="/">
        <img src={logoSVG} alt="D'oscars' logo" />
      </Link>
      <nav>
        <Link to="/feed">Feed</Link>
        <Link to="/enlisted">Enlisted Movies</Link>
        <Link to="/ranking">Ranking</Link>
        <Button onClick={participate}>Participate</Button>
      </nav>
      <img
        src={togglerSVG}
        alt="Toggler svg"
        id="toggler"
        onClick={() => openSidedrawer()}
      />
    </header>
  );
};

export default Header;
