// MovieSlider.js
import React from "react";
import "../style/movieslider.css";

const MovieSlider = ({
  genre,
  movies,
  generateImageUrl,
  activeMovie,
  onMovieClick,
  moviesPerGenre,
}) => {
  return (
    <div>
      <h2>{genre.name}</h2>
      <div className="slider">
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => onMovieClick(movie)}>
            <img
              src={generateImageUrl(movie.backdrop_path)}
              alt={movie.title}
              style={{
                border:
                  activeMovie && activeMovie.id === movie.id
                    ? "2px solid red"
                    : "none",
              }}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
