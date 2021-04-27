import React, { useState, createContext, useEffect } from "react";
import { SnackbarContext, variant } from "../global";
import Snackbar from "../components/Snackbar/Snackbar";

const Context = createContext<SnackbarContext>({
  hasMessage: false,
  value: "",
  setMessage: (s: string, v?: variant) => {},
});

const SnackbarProvider: React.FC = ({ children }) => {
  const [hasMessage, setHasMessage] = useState(false);
  const [value, setValue] = useState("eai");
  const [showMessage, setShowMessage] = useState(false);
  const [type, setType] = useState<variant>("error");

  useEffect(() => {
    if (hasMessage) {
      setTimeout(() => {
        setShowMessage(false); // desencadeia a animacao de volta
        setTimeout(() => {
          setHasMessage(false); // retira da pagina, apos a animacao terminar
        }, 400);
      }, 3000);
    }
  }, [hasMessage]);

  function setMessage(message: string, v?: variant) {
    setValue(message);
    setShowMessage(true);
    setHasMessage(true);
    setType(v || "error");
  }

  return (
    <Context.Provider value={{ hasMessage, value, setMessage }}>
      {children}
      {hasMessage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Snackbar errorMessage={value} leave={!showMessage} type={type} />
        </div>
      )}
    </Context.Provider>
  );
};

export { SnackbarProvider, Context };
