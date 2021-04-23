import React from "react";
import img404 from "../../assets/images/img404.svg";
import "./styles.css";

interface Props {
  style?: React.CSSProperties;
  imgAlt?: string;
}

const Img404: React.FC<Props> = ({ style, imgAlt }) => {
  return (
    <div className="img404">
      <img src={img404} alt={imgAlt || "image not found"} />
    </div>
  );
};

export default Img404;
