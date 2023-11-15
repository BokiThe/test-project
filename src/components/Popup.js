// components/Popup.js
import React from "react";

const Popup = ({ movie, onClose }) => {
  return (
    <div>
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
      <p>Vote Average: {movie.vote_average}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Popup;
