// Movie.js

import React from "react";

const Movie = ({ title, overview, releaseDate, posterPath }) => (
  <div>
    <h2>{title}</h2>
    <p>{overview}</p>
    <p>Release Date: {releaseDate}</p>
    <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
  </div>
);

export default Movie;
