import React, { useContext, useEffect, useState } from "react";
import { Context as EthContext } from "../../Context/EthereumProvider";
import { Context as SnkContext } from "../../Context/SnackbarProvider";
import Loading from "../../components/Loading/Loading";
import clsx from "clsx";

import api from "../../api";
import { MovieDetailed } from "../../global";

import "./styles.css";
import MoviePoster from "../../components/MoviePoster/MoviePoster";
import MovieModal from "../../components/MovieModal/MovieModal";

const EnlsitedMovies: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<MovieDetailed[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(-1);
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { contract, state } = useContext(EthContext);
  const { setMessage } = useContext(SnkContext);
  useEffect(() => {
    (async () => {
      // array with the ids of all the enslited movies
      const idArray: number[] = await contract?.methods.getMovies().call();
      // unfortunately, we'll need to make one request for each enlisted movie.
      const finalMovies: MovieDetailed[] = [];
      for (let id of idArray) {
        try {
          const { data } = await api.get(`/movie/${id}`);
          finalMovies.push(data);
        } catch (e) {
          return setMessage(
            "We could not retrieve information for all enlisted movies. Please, refresh your page."
          );
        }
      }
      setMovies(finalMovies);
      setImagesLoaded(0);
    })();
  }, [contract?.methods]);

  useEffect(() => {
    if (imagesLoaded >= movies.length) {
      setLoading(false);
    }
  }, [imagesLoaded, movies.length]);

  return (
    <main>
      <h1
        className="page-title fadeFromTop"
        style={{ marginBottom: state !== "voting" ? "5rem" : "1rem" }}
      >
        ENLISTED MOVIES
      </h1>
      {state === "voting" && (
        <p
          className="page-subtitle fadeFromTop"
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          Click on a movie and complete the transaction to vote for it.
        </p>
      )}

      <div className={clsx("enlisted-movies", loading && "loading")}>
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Loading />
          </div>
        )}
        {movies.map((movie, index) => (
          <MoviePoster
            key={movie.id}
            {...movie}
            style={{ animationDelay: `${(index + 1) * 0.15}s` }}
            onImageError={() => setImagesLoaded((prevState) => prevState + 1)}
            onImageLoad={() => setImagesLoaded((prevState) => prevState + 1)}
            fadeFromLeft
            onClick={() => {
              setSelectedMovie(movie.id);
              setShowModal(true);
            }}
          />
        ))}
        {showModal && (
          <MovieModal
            closeModal={() => setShowModal(false)}
            movieID={selectedMovie}
            showAction={state === "voting"}
          />
        )}
      </div>
    </main>
  );
};

export default EnlsitedMovies;
