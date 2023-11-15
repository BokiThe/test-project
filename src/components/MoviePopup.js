// MoviePopup.js
import React, { useEffect } from "react";

const MoviePopup = ({ movie, onClose }) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [onClose]);

  const generateImageUrl = (posterPath) =>
    `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className="movie-popup">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        <div className="popup-wrapper">
          <img src={generateImageUrl(movie.poster_path)} alt={movie.title} />
          <div className="popup-heading">
            <h2>{movie.title}</h2>
            <p>Vote Average: {movie.vote_average}</p>
          </div>
        </div>

        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MoviePopup;
