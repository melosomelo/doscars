import React from "react";
import "./styles.css";

interface Props {
  value?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<Props> = ({ value, onChange, ...rest }) => {
  return <input value={value} {...rest} onChange={onChange} />;
};

export default Input;
