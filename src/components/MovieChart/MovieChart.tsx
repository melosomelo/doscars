import React, { useEffect, useState, useRef } from "react";
import { ChartData, MovieDetailed } from "../../global";
import { posterBasePath } from "../../api";
import clsx from "clsx";
import api from "../../api";

import "./styles.css";

interface Props extends ChartData {
  greatest: number;
  delay?: number;
}

const MovieChart: React.FC<Props> = ({
  posterPath,
  votes,
  greatest,
  movieID,
  delay,
}) => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<MovieDetailed>();
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/movie/${movieID}`);
      setLoading(false);
      setMovie(data);
    })();
  }, [movieID]);

  const onChartHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowDetails(true);
    (detailsRef.current as HTMLDivElement).style.left = `${e.clientX}px`;
    (detailsRef.current as HTMLDivElement).style.top = `${e.clientY}px`;
  };

  const onChartBlur = () => {
    setShowDetails(false);
  };

  return (
    <>
      <div className={clsx("movie-chart", loading && "loading")}>
        <img
          src={`${posterBasePath}${posterPath}`}
          alt="rhey"
          className="fadeFromTop"
          style={{ animationDelay: `${(delay || 0) + 0.5}s` }}
        />
        <div
          onMouseEnter={onChartHover}
          onMouseLeave={onChartBlur}
          className="chart"
          style={{
            maxHeight: `${(parseInt(votes) / greatest) * 100}%`,
            animationDelay: `${delay || 0}s`,
          }}
        />
      </div>
      <div className={clsx("details", showDetails && "show")} ref={detailsRef}>
        {movie && (
          <>
            <p>{movie?.title}</p>
            <span>
              {votes} vote{parseInt(votes) > 1 ? "s" : ""}
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default MovieChart;
