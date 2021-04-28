import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { ChartData, MovieDetailed } from "../../global";
import api from "../../api";

import "./styles.css";

interface Props extends ChartData {
  index: number;
  animationDelay?: number;
}

const OTR: React.FC<Props> = ({
  movieID,
  votes,
  posterPath,
  index,
  animationDelay,
}) => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<MovieDetailed>();

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/movie/${movieID}`);
      setMovie(data);
      setLoading(false);
    })();
  }, [movieID]);

  return (
    <div
      className={clsx("otr", loading && "loading", !loading && "fadeFromLeft")}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {movie && (
        <p>
          {index + 1}º {movie.title} - {votes} vote
          {parseInt(votes) !== 1 ? "s" : ""}{" "}
        </p>
      )}
    </div>
  );
};

export default OTR;
