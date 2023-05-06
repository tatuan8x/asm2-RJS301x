import React, { useState, useEffect } from "react";
import { API_KEY, baseUrl, requests } from "../../Contains/Contains";
import instance from "../../axios";
import MovieDetail from "../MovieDetail/MovieDetail";
import "./SearchResult.scss";

const SearchResult = ({ search }) => {
  // khai báo states
  const [movies, setMovies] = useState([]);
  const [videoTrailer, setVideoTrailer] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  // endpoint của search.
  const url = `${requests.fetchSearch}&query=${search}`;

  // effect tìm movie. Nếu ko search thì setMovies để rỗng
  useEffect(() => {
    const fetchSearch = async () => {
      const request = await instance.get(url);
      setMovies(request.data.results);
      console.log(request.data.results);
      return request;
    };

    if (search) {
      fetchSearch();
    } else {
      setMovies([]);
    }
  }, [url, search]);

  // useEffect để fetch trailer từ selectedMovie
  useEffect(() => {
    async function fetchTrailer(movie) {
      if (movie) {
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
          console.log(trailer.key);
        } else {
          setVideoTrailer(null);
        }
      } else {
        setVideoTrailer(null);
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
    <div className="searchResult">
      <h2 className="searchTitle">Search Result</h2>
      <div className="moviePosterContainer">
        {/* hiển thị trailer */}
        {selectedMovie && videoTrailer && (
          <MovieDetail movieData={selectedMovie} movieTrailer={videoTrailer} />
        )}
        {selectedMovie && !videoTrailer && (
          <MovieDetail movieData={selectedMovie} />
        )}
      </div>
      <div className="row_posters searchResultContainer">
        {movies.map((movie) => {
          return (
            <div key={movie.id}>
              <>
                <img
                  onClick={() => handleClick(movie)}
                  className="searchMoviePoster"
                  src={`${baseUrl}${movie.poster_path}`}
                  alt={movie.name}
                />
              </>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResult;
