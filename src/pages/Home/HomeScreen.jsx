import React from "react";
import "./HomeScreen.css";
import Nav from "../../components/Nav/Nav";
import Banner from "../../components/Banner/Banner";
import request from "../../axios/Request";
import Row from "../../components/Row/Row";
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
      <Row
        title="Action Movies"
        fetchUrl={request.fetchActionMovies}
        isLargeRow
      />
      <Row
        title="Comedy Movies"
        fetchUrl={request.fetchComedyMovies}
        isLargeRow
      />
      <Row
        title="Horror Movies"
        fetchUrl={request.fetchHorrorMovies}
        isLargeRow
      />
      <Row
        title="Romance Movies"
        fetchUrl={request.fetchRomanceMovies}
        isLargeRow
      />
      <Row
        title="Documentaries"
        fetchUrl={request.fetchDocumentaries}
        isLargeRow
      />
    </div>
  );
};

export default HomeScreen;
