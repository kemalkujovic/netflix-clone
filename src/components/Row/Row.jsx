import React, { useEffect, useState } from "react";
import "./Row.css";
import { useDispatch, useSelector } from "react-redux";
import { getFilms } from "../../app/filmsSlice";
const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";
  const dispatch = useDispatch();
  const select = useSelector((state) => state.films);
  useEffect(() => {
    async function fetchData() {
      const request = await dispatch(getFilms(fetchUrl));
      setMovies(request.payload.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                key={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Row;
