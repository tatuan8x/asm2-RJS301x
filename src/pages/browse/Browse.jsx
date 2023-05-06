import React from "react";
import Navbar from "../../Component/Navbar/Navbar";
import Banner from "../../Component/Banner/Banner";
import MovieList from "../../Component/MovieList/MovieList";
import "./Browse.scss";
import { requests } from "../../Contains/Contains";

function Browse() {
  return (
    <div className="home">
      <Navbar />
      <Banner fetchUrl={requests.fetchNetflixOriginals} />

      <MovieList
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <MovieList title="Xu Hướng" fetchUrl={requests.fetchTrending} />
      <MovieList title="Hành Động" fetchUrl={requests.fetchActionMovies} />
      <MovieList title="Hài" fetchUrl={requests.fetchComedyMovies} />
      <MovieList title="Kinh Dị" fetchUrl={requests.fetchHorrorMovies} />
      <MovieList title="Lãng mạng" fetchUrl={requests.fetchRomanceMovies} />
      <MovieList title="Tài Liệu" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default Browse;
