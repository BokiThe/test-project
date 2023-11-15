// src/components/MovieList/MovieList.js
import React, { useState, useEffect } from "react";
import { fetchMoviesBasedOnGenreId } from "../../services/api"; // Adjust the import path based on your project structure

const MovieList = ({ genreId }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const apiKey = "your_api_key"; // Replace with your actual API key
    const page = 1; // You can adjust the page as needed

    const fetchData = async () => {
      try {
        const result = await fetchMoviesBasedOnGenreId(genreId, page, apiKey);
        setMovies(result);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };

    fetchData();
  }, [genreId]);

  return (
    <div>
      <h2>Movies based on Genre ID {genreId}</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
