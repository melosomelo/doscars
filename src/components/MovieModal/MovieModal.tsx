import React, { useState, useEffect, useRef, useContext } from "react";
import { MovieDetailed } from "../../global";
import api, { posterBasePath } from "../../api";
import Loading from "../../components/Loading/Loading";
import closeSVG from "../../assets/images/close.svg";
import Button from "../../components/Button/Button";
import { Context } from "../../Context/EthereumProvider";
import clsx from "clsx";

import "./styles.css";
import Img404 from "../Img404/Img404";

interface Props {
  movieID: number;
  closeModal: () => void;
  showAction?: boolean;
}

const MovieModal: React.FC<Props> = ({ movieID, closeModal, showAction }) => {
  const [movie, setMovie] = useState<MovieDetailed>({
    title: "",
    release_date: "",
    genres: [],
    credits: { crew: [] },
    id: 0,
    overview: "",
    poster_path: "",
  });
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { state, enlistMovie } = useContext(Context);

  useEffect(() => {
    document.querySelector("body")?.classList.add("no-scroll");
    (async () => {
      const { data } = await api.get(
        `/movie/${movieID}?append_to_response=credits`
      );
      setMovie(data);
      setLoading(false);
    })();

    return () => document.querySelector("body")?.classList.remove("no-scroll");
  }, [movieID]);

  async function onButtonClick() {
    if (state === "enlisting") {
      await enlistMovie(movieID, movie.poster_path);
    }
  }
  return (
    <div className="movie-modal-backdrop">
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
      <img
        src={closeSVG}
        alt="A close icon"
        role="button"
        style={{
          cursor: "pointer",
          position: "fixed",
          top: "8px",
          right: "8px",
          width: "50px",
          zIndex: 1000,
        }}
        onClick={() => {
          if (modalRef.current) {
            modalRef.current.classList.add("leaving");
            setTimeout(() => {
              closeModal();
            }, 400);
          } else {
            closeModal();
          }
        }}
      />
      {!loading && (
        <div
          className={clsx("movie-modal", imageLoaded && "loaded")}
          ref={modalRef}
        >
          {!imageError && (
            <img
              src={`${posterBasePath}${movie.poster_path}`}
              alt={`Movie poster for ${movie.title}`}
              onError={() => {
                setImageLoaded(true);
                setImageError(true);
              }}
              onLoad={() => setImageLoaded(true)}
            />
          )}
          {imageError && <Img404 />}
          <div className="movie-modal-text">
            <div className="movie-modal-title">
              <h1>{movie.title}</h1>
              <span>{movie.release_date.split("-")[0]}</span>
            </div>
            <span className="movie-modal-director">
              {
                movie.credits.crew.find((value) => value.job === "Director")
                  ?.name
              }
            </span>
            <p>{movie.overview}</p>
            <div className="genres-wrapper">
              {movie.genres.map((genre) => (
                <div className="genre" key={genre.id}>
                  {genre.name}
                </div>
              ))}
            </div>
            {showAction && (
              <Button
                style={{ marginLeft: "auto", marginTop: "4rem" }}
                onClick={onButtonClick}
              >
                Enlist
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieModal;
