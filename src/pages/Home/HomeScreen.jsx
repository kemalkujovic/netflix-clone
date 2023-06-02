import React from "react";
import "./HomeScreen.css";
import Nav from "../../components/Nav/Nav";
import Banner from "../../components/Banner/Banner";
import request from "../../axios/Request";
import Row from "../../components/Row/Row";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const HomeScreen = () => {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={request.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={request.fetchTrending} isLargeRow />
      <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={request.fetchDocumentaries} />
    </div>
  );
};

export default HomeScreen;
