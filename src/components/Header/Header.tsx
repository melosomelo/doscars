import React from "react";
import { Link } from "react-router-dom";

import Button from "../Button/Button";

import logoSVG from "../../assets/images/logo.svg";
import togglerSVG from "../../assets/images/toggler.svg";

import "./styles.css";

interface Props {
  openSidedrawer: () => void;
}

const Header: React.FC<Props> = ({ openSidedrawer }) => {
  return (
    <header>
      <img src={logoSVG} alt="D'oscars' logo" />
      <nav>
        <Link to="enlisted">Enlisted Movies</Link>
        <Link to="enlisted">Ranking</Link>
        <Link to="participate">
          <Button>Participate</Button>
        </Link>
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
