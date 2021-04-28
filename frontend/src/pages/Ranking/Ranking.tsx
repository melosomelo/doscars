import React, { useState, useEffect, useContext } from "react";
import { Context as EthContext } from "../../Context/EthereumProvider";

import Loading from "../../components/Loading/Loading";

import { BlockchainMovie, ChartData } from "../../global";
import "./styles.css";
import MovieChart from "../../components/MovieChart/MovieChart";
import OTR from "../../components/OtherMovieRanking/OTR";

const Ranking: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<ChartData[]>([]);
  const { state, contract } = useContext(EthContext);

  useEffect(() => {
    (async () => {
      const moviesID: number[] = await contract?.methods.getMovies().call();
      const finalMovies: ChartData[] = [];
      for (let movieID of moviesID) {
        const blkchainMovie: BlockchainMovie = await contract?.methods
          .movies(movieID)
          .call();
        finalMovies.push({ ...blkchainMovie, movieID });
      }
      finalMovies.sort((a, b) => {
        const aVotes = parseInt(a.votes);
        const bVotes = parseInt(b.votes);
        return bVotes - aVotes;
      });

      setMovies(finalMovies);
      setLoading(false);
    })();
  }, [contract?.methods]);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {loading && <Loading />}
        </div>
      )}
      {state === "enlisting" && !loading && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "3rem",
          }}
        >
          <p style={{ textAlign: "center" }}>
            The app is still in the enlisting stage.
          </p>
        </div>
      )}
      {!loading && movies.length > 0 && (
        <>
          <h1 className="page-title fadeFromTop">RANKING</h1>
          <main className="ranking">
            <div className="top-5">
              {movies.slice(0, 5).map((cData, index) => (
                <MovieChart
                  key={cData.movieID}
                  {...cData}
                  greatest={parseInt(movies[0].votes)}
                  delay={index * 0.2}
                />
              ))}
            </div>
            {movies.length > 5 && (
              <div className="other-movies">
                <p>Other movies</p>
                <div className="otr-container">
                  {movies.slice(5).map((cData, index) => (
                    <OTR
                      {...cData}
                      key={cData.movieID}
                      index={index + 5}
                      animationDelay={0.3 * index}
                    />
                  ))}
                </div>
              </div>
            )}
          </main>
        </>
      )}
    </>
  );
};

export default Ranking;
