import React from "react";
import clsx from "clsx";
import "./styles.css";
import { variant } from "../../global";

interface Props {
  errorMessage: string;
  leave: boolean;
  type?: variant;
}

const Error: React.FC<Props> = ({ errorMessage, leave, type }) => {
  return (
    <div className={clsx("snackbar-message", leave && "leave", type)}>
      {errorMessage}
    </div>
  );
};

export default Error;
