import React, { useState, useMemo } from "react";
import { Movie } from "../../global";
import { posterBasePath } from "../../api";

import clsx from "clsx";
import img404 from "../../assets/images/img404.svg";

import "./styles.css";

interface Props extends Movie {
  showTitle?: boolean;
  fadeFromLeft?: boolean;
  style?: React.CSSProperties;
  onImageLoad?: React.ReactEventHandler<HTMLImageElement>;
  onImageError?: React.ReactEventHandler<HTMLImageElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const MoviePoster: React.FC<Props> = ({
  poster_path,
  title,
  showTitle,
  fadeFromLeft,
  style,
  onImageLoad,
  onImageError,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);
  // prevents image caching
  const imagePath = useMemo(() => {
    return `${posterBasePath}${poster_path}?${
      new Date().getMilliseconds() + new Date().getSeconds()
    }`;
  }, [poster_path]);
  return (
    <div
      className={clsx("movie-poster", fadeFromLeft && "fadeFromLeft")}
      style={style}
      onClick={onClick}
    >
      <div className={clsx("image-wrapper", imageError && "img404")}>
        <div className="image-overlay" />
        <img
          src={imageError ? img404 : `${imagePath}`}
          alt={`poster for ${title}`}
          onLoad={onImageLoad}
          onError={(e) => {
            setImageError(true);
            if (onImageError) {
              onImageError(e);
            }
          }}
        />
      </div>
      {showTitle && <h2>{title}</h2>}
    </div>
  );
};

export default MoviePoster;
