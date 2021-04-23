import React from "react";

import "./styles.css";

export default function Loading() {
  return (
    <div className="loading-wrapper">
      <div className="ball" />
      <div className="ball" style={{ animationDelay: "1s" }} />
      <div className="ball" style={{ animationDelay: "2s" }} />
      <div className="ball" style={{ animationDelay: "3s" }} />
    </div>
  );
}
