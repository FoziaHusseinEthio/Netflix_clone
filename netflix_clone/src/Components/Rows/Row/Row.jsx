import React, { useState, useEffect, useCallback } from "react";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import "./Row.css";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movieLoading, setMovieLoading] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const base_url = "https://image.tmdb.org/t/p/original/";

  const fetchData = useCallback(async () => {
    setMovieLoading(true);
    setError(null);
    try {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load movies.");
      setMovies([]);
    } finally {
      setMovieLoading(false);
    }
  }, [fetchUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleClick = useCallback(
    (movie) => {
      const movieName =
        movie?.name || movie?.title || movie?.original_name || "";

      if (trailerUrl && selectedMovie === movieName) {
        setTrailerUrl("");
        setSelectedMovie(null);
        setError(null);
        return;
      }

      setSelectedMovie(movieName);
      setTrailerLoading(true);
      setError(null);

      movieTrailer(movieName)
        .then((url) => {
          setTrailerLoading(false);
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          } else {
            setError(`Trailer not found for ${movieName}`);
            setTrailerUrl("");
          }
        })
        .catch((err) => {
          setTrailerLoading(false);
          console.error("Error fetching trailer:", err);
          setError(`Error fetching trailer for ${movieName}`);
          setTrailerUrl("");
        });
    },
    [trailerUrl, selectedMovie]
  );

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      {movieLoading && <div className="row__loading">Loading movies...</div>}
      {error && <div className="row__error">{error}</div>}

      {!movieLoading && !error && (
        <div className="row_posters">
          {movies?.map((movie) => (
            <img
              key={movie.id}
              role="button"
              tabIndex="0"
              onClick={() => handleClick(movie)}
              onKeyDown={(e) => e.key === "Enter" && handleClick(movie)}
              className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={
                movie.name ||
                movie.title ||
                movie.original_name ||
                "Movie Poster"
              }
            />
          ))}
        </div>
      )}

      <div className="row__trailer-container ">
        {trailerLoading && <div className="row__loading">Loading trailer...</div>}
        {error && !movieLoading && <div className="row__error">{error}</div>}
        {trailerUrl && !trailerLoading && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
};

export default Row;
