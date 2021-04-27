import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../Context/EthereumProvider";
import api, { posterBasePath } from "../../api";
import { MovieDetailed } from "../../global";
import Loading from "../../components/Loading/Loading";
import { Redirect } from "react-router";
import "./styles.css";

const Over: React.FC = () => {
  const [movie, setMovie] = useState<MovieDetailed>();
  const [loading, setLoading] = useState(true);
  const { contract, state } = useContext(Context);

  useEffect(() => {
    (async () => {
      const moviesID = await contract?.methods.getMovies().call();
      const winnerIndex = await contract?.methods.winner().call();

      const { data } = await api.get(
        `/movie/${moviesID[winnerIndex]}?append_to_response=credits`
      );

      setMovie(data);
      setLoading(false);
    })();
  }, [contract?.methods]);

  if (state !== "over") {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <Loading centered />;
  }

  console.log(movie);

  return (
    <main className="over">
      <h1 className="page-title fadeFromTop">THE WINNER IS...</h1>
      <img
        src={`${posterBasePath}${movie?.poster_path}`}
        alt={`Poster for ${movie?.title}`}
        className="fadeFromTop"
      />
      <h2 className="fadeFromTop">{movie?.title}</h2>
      <p className="fadeFromTop">
        {movie?.credits.crew.find((c) => c.job === "Director")?.name}
      </p>
    </main>
  );
};

export default Over;
