import React, { useState, useEffect } from "react";
import "./Banner.scss";
import { baseUrl } from "../../Contains/Contains";
import instance from "../../axios";

const Banner = ({ fetchUrl }) => {
  // states ban đầu
  const [film, setFilm] = useState([]);

  // hàm lấy ngẫu nhiên một bộ phim trong array
  const randomIndex = (arrLength) => Math.floor(Math.random() * arrLength - 1);
  useEffect(() => {
    // hàm lấy dữ liệu phim
    async function fetchMovie() {
      const request = await instance.get(fetchUrl);
      const moviesContainPosters = request.data.results.filter(
        (film) => film["backdrop_path" || film["poster_path"]]
      );
      const bannerMovie =
        moviesContainPosters[randomIndex(moviesContainPosters.length)];

      setFilm(() => bannerMovie);
    }

    fetchMovie();
  }, [fetchUrl]);

  // định dạng background image cho banner
  const backgroundImage = {
    backgroundImage: `url(${baseUrl}${
      film?.backdrop_path || film?.poster_path
    })`,
  };

  return (
    <div className="bannerContainer" style={backgroundImage}>
      <h1 className="filmTittle">{film?.name}</h1>
      <div className="buttonGroupBanner">
        <button>Play</button>
        <button>My List</button>
      </div>
      <p className="filmOverview">{film?.overview}</p>
    </div>
  );
};

export default Banner;
