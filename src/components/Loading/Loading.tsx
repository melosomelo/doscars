import React from "react";
import clsx from "clsx";

import "./styles.css";

interface Props {
  centered?: boolean;
}

const Loading: React.FC<Props> = ({ centered }) => {
  return (
    <div className={clsx("loading-wrapper", centered && "centered")}>
      <div className="ball" />
      <div className="ball" style={{ animationDelay: "1s" }} />
      <div className="ball" style={{ animationDelay: "2s" }} />
      <div className="ball" style={{ animationDelay: "3s" }} />
    </div>
  );
};

export default Loading;
