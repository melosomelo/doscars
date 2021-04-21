import React, { useState } from "react";
import Input from "../../components/Input/Input";

import "./styles.css";
import arrowSVG from "../../assets/images/arrow.svg";

export default function Enlist() {
  const [pageState, setPageState] = useState<"searching" | "selecting">(
    "searching"
  );
  const [searchValue, setSearchValue] = useState("");

  return (
    <main className="enlist">
      {pageState === "searching" ? (
        <div className="search-wrapper">
          <h1 className="page-title">ENLIST A MOVIE</h1>
          <p className="page-subtitle">Search for a movie</p>
          <div className="input-wrapper">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div
              className="arrow"
              role="button"
              onClick={() => {
                if (searchValue.length > 0) {
                  setPageState("selecting");
                }
              }}
            >
              <img src={arrowSVG} alt="An arrow SVG" />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
