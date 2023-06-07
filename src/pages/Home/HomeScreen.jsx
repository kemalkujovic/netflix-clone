import React from "react";
import "./HomeScreen.css";
import Nav from "../../components/Nav/Nav";
import Banner from "../../components/Banner/Banner";
import request from "../../axios/Request";
import Row from "../../components/Row/Row";

const HomeScreen = () => {
  const rows = [
    {
      title: "NETFLIX ORIGINALS",
      fetchUrl: request.fetchNetflixOriginals,
      isLargeRow: true,
    },
    {
      title: "Trending Now",
      fetchUrl: request.fetchTrending,
      isLargeRow: true,
    },
    { title: "Action Movies", fetchUrl: request.fetchActionMovies },
    { title: "Comedy Movies", fetchUrl: request.fetchComedyMovies },
    { title: "Horror Movies", fetchUrl: request.fetchHorrorMovies },
    { title: "Romance Movies", fetchUrl: request.fetchRomanceMovies },
    { title: "Documentaries", fetchUrl: request.fetchDocumentaries },
  ];
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      {rows.map((row, index) => (
        <Row
          key={index}
          title={row.title}
          fetchUrl={row.fetchUrl}
          isLargeRow={row.isLargeRow}
        />
      ))}
    </div>
  );
};

export default HomeScreen;
