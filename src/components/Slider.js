// components/Slider.js
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { fetchMoviesByGenre } from "../services/api";

const Slider = ({ genre }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await fetchMoviesByGenre(genre.id);
        setMovies(moviesData);
      } catch (error) {
        console.error(`Error fetching movies for ${genre.name} genre:`, error);
      }
    };

    getMovies();
  }, [genre]);

  return (
    <div>
      <h3>{genre.name}</h3>
      <div style={{ display: "flex" }}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Slider;
