import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import Input from "../../components/Input/Input";

import "./styles.css";
import arrowSVG from "../../assets/images/arrow.svg";
import api from "../../api";
import { SearchQueryResult, Movie } from "../../global";

import { Context } from "../../Context/EthereumProvider";

import MoviePoster from "../../components/MoviePoster/MoviePoster";
import MovieModal from "../../components/MovieModal/MovieModal";
import Loading from "../../components/Loading/Loading";
import clsx from "clsx";

export default function Enlist() {
  const [pageState, setPageState] = useState<"searching" | "selecting">(
    "searching"
  );
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(-1);
  const { state } = useContext(Context);

  useEffect(() => {
    (async () => {
      if (pageState === "selecting") {
        let searchResults: SearchQueryResult;
        const { data } = await api.get(`/search/movie?query=${searchValue}`);
        searchResults = data;
        setMovies(searchResults.results);
        setImagesLoaded(0);
      }
    })();
  }, [pageState, searchValue]);

  useEffect(() => {
    if (imagesLoaded < movies.length) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [imagesLoaded, movies.length]);

  if (state !== "enlisting") {
    return <Redirect to="/" />;
  }

  return (
    <main className="enlist">
      {pageState === "searching" ? (
        <div className="search-wrapper">
          <h1 className="page-title fadeFromTop">ENLIST A MOVIE</h1>
          <p className="page-subtitle fadeFromTop">Search for a movie</p>
          <div className="input-wrapper fadeFromTop">
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
      ) : (
        <>
          {showModal && (
            <MovieModal
              closeModal={() => setShowModal(false)}
              movieID={selectedMovie}
              showAction
            />
          )}
          <div className="search-results-wrapper">
            <img
              src={arrowSVG}
              alt="An arrow svg"
              onClick={() => {
                setPageState("searching");
                setMovies([]);
                setSearchValue("");
                setImagesLoaded(-1);
              }}
            />
            <p>
              Search results for: <span>{searchValue}</span>
            </p>
            <div className={clsx("search-results", loading && `loading`)}>
              {loading && <Loading />}
              {movies.map((movie, index) => (
                <MoviePoster
                  {...movie}
                  key={movie.id}
                  showTitle
                  fadeFromLeft
                  style={{ animationDelay: `${(index + 1) * 0.3}s` }}
                  onImageLoad={() =>
                    setImagesLoaded((prevState) => prevState + 1)
                  }
                  onImageError={() =>
                    setImagesLoaded((prevState) => prevState + 1)
                  }
                  onClick={() => {
                    setSelectedMovie(movie.id);
                    setShowModal(true);
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
