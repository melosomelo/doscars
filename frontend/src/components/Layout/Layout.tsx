import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import Header from "../Header/Header";
import Button from "../Button/Button";

import { Context } from "../../Context/EthereumProvider";

import logoSVG from "../../assets/images/logo.svg";
import closeSVG from "../../assets/images/close.svg";

import "./styles.css";

const Layout: React.FC = ({ children }) => {
  const [showSidedrawer, setShowSidedrawer] = useState(false);
  const sidedrawerRef = useRef<HTMLDivElement | null>(null);
  const { participate } = useContext(Context);

  const openSidedrawer = () => {
    sidedrawerRef.current?.classList.remove("close");
    setShowSidedrawer(true);
  };
  const closeSidedrawer = async () => {
    sidedrawerRef.current?.classList.add("close");
    setTimeout(() => {
      setShowSidedrawer(false);
    }, 500);
  };

  return (
    <>
      <Header openSidedrawer={openSidedrawer} />
      {children}
      <div className={clsx("sidedrawer-container", showSidedrawer && "open")}>
        <div className="sidedrawer" ref={sidedrawerRef}>
          <img
            src={closeSVG}
            alt="A close icon"
            className="close-icon"
            onClick={closeSidedrawer}
          />
          <img src={logoSVG} alt="D'oscars' logo" className="sidedrawer-logo" />
          <nav>
            <Link to="/enlisted">Enlisted movies</Link>
            <Link to="/ranking">Ranking</Link>
            <Button
              onClick={() => {
                closeSidedrawer();
                participate();
              }}
            >
              Participate
            </Button>
          </nav>
        </div>
      </div>
      <p className="signature">
        A project by <span>Mateus Nascimento</span>
      </p>
    </>
  );
};

export default Layout;
