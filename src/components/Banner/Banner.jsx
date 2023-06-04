import React, { useEffect, useState } from "react";
import "./Banner.css";
import request from "../../axios/Request";
import { getFilms } from "../../app/loremSlice";
import { useDispatch, useSelector } from "react-redux";
const Banner = () => {
  const [movie, setMovie] = useState([]);
  const dispatch = useDispatch();
  const select = useSelector((state) => state.films);
  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(getFilms(request.fetchNetflixOriginals));
      setMovie(
        data.payload.results[
          Math.floor(Math.random() * data.payload.results?.length - 1)
        ]
      );
      return data;
    }

    fetchData();
  }, []);
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await axios.get(request.fetchNetflixOriginals);
  //     setMovie(
  //       data.data.results[
  //         Math.floor(Math.random() * data.data.results.length - 1)
  //       ]
  //     );
  //     return data;
  //   }

  //   fetchData();
  // }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
};

export default Banner;
