// MovieCard.js
import React from "react";
import "../style/moviecard.css"; // Make sure to have your styles imported

const MovieCard = ({ movie, imageUrl, isActive, onClick }) => {
  return (
    <div className={`movie-card ${isActive ? "active" : ""}`} onClick={onClick}>
      <img src={imageUrl} alt={movie.title} />
      {isActive && (
        <div className="movie-info">
          <p className="movie-title">{movie.title}</p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
