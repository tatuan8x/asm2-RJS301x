import React, { useState, useEffect } from "react";
import "./MovieList.scss";
import instance from "../../axios";
import MovieDetail from "../MovieDetail/MovieDetail";
import { API_KEY, baseUrl } from "../../Contains/Contains";

function MovieList({ fetchUrl, title, isLargeRow = false }) {
  // khai báo states ban đầu
  const [movies, setMovies] = useState([]);
  const [videoTrailer, setVideoTrailer] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // useEffect thực hiện các side-effect khi component được render hoặc update
  useEffect(() => {
    async function fetchMovies(moviesNum) {
      const response = await instance.get(`${fetchUrl}`);

      // Lọc ra những movie có hình ảnh (backdrop_path hoặc poster_path)
      const moviesHasPosters = response.data.results.filter(
        (movie) => movie?.["backdrop_path"] || movie?.["poster_path"]
      );
      // Lưu lại movies vào state
      setMovies(() => moviesHasPosters.splice(0, moviesNum));
    }
    fetchMovies(10);
  }, [fetchUrl]);

  // useEffect để fetch trailer từ selectedMovie
  useEffect(() => {
    async function fetchTrailer(movie) {
      if (selectedMovie) {
        const response = await instance.get(
          `movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
        );

        // Lọc ra các video có site là YouTube và type là Trailer hoặc Teaser
        const trailers = response.data.results.filter(
          (movie) =>
            movie.site === "YouTube" &&
            (movie.type === "Teaser" || movie.type === "Trailer")
        );
        console.log(trailers);

        // Lấy key của video Trailer đầu tiên hoặc null nếu không có
        if (trailers.length > 0) {
          const trailer = trailers.find(
            (video) => video.type === "Trailer" || video[0]
          );
          setVideoTrailer(trailer.key);
        } else {
          setVideoTrailer(null);
        }
      }
    }

    // Fetch trailer từ selectedMovie
    fetchTrailer(selectedMovie);
  }, [selectedMovie]);

  // Xử lý sự kiện khi người dùng click vào poster để xem trailer
  const handleClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setVideoTrailer(null);
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  return (
    <div className="movieListContainer">
      <h2 className="movieTitle">{title}</h2>
      <div className="moviePoster">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <div key={movie.id}>
                <>
                  <img
                    onClick={() => handleClick(movie)}
                    className={`moviePoster ${
                      isLargeRow && "moviePosterLarge"
                    }`}
                    src={`${baseUrl}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie.name}
                  />
                </>
              </div>
            )
        )}
      </div>
      {/* hiển thị trailer */}
      {selectedMovie && videoTrailer && (
        <MovieDetail movieData={selectedMovie} movieTrailer={videoTrailer} />
      )}
      {selectedMovie && !videoTrailer && (
        <MovieDetail movieData={selectedMovie} />
      )}
    </div>
  );
}

export default MovieList;
