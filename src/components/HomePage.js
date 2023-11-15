import React, { useState, useEffect, useMemo, useCallback } from "react";
import { createRoot } from "react-dom/client";
import MovieSlider from "./MovieSlider";
import { fetchMoviesBasedOnGenreId } from "../services/api"; // Import login and fetchMoviesBasedOnGenreId
import genresData from "../assets/genres.json";
import MoviePopup from "./MoviePopup";
import "../style/homepage.css";
import "../style/moviepopups.css";

const apiKey = "d38aa8716411ef7d8e9054b34a6678ac";

const HomePage = () => {
  const [selectedGenreIndex, setSelectedGenreIndex] = useState(0);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [activeMovie, setActiveMovie] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]); // New state for popular movies

  const genres = useMemo(() => genresData.genres, []);
  useEffect(() => {
    const fetchAndSetMovies = async () => {
      try {
        const genreId = genres[selectedGenreIndex].id;
        const page = 1;
        const movies = await fetchMoviesBasedOnGenreId(genreId, page, apiKey);
        setMoviesByGenre((prev) => ({
          ...prev,
          [genreId]: movies,
        }));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const data = await response.json();
        setPopularMovies(data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchAndSetMovies();
    fetchPopularMovies(); // Fetch popular movies when the component mounts
  }, [selectedGenreIndex, genres]);

  const generateImageUrl = (backdropPath) =>
    `https://image.tmdb.org/t/p/w500${backdropPath}`;

  const handleMovieClick = (movie) => {
    setActiveMovie(movie);
    setPopupOpen(true); // Open the popup when a movie is clicked
  };

  // Close the popup
  const closePopup = useCallback(() => {
    setPopupOpen(false);
  }, []);

  // Function to navigate between movies
  const navigateMovies = useCallback((direction) => {
    // Implement your logic to find the next or previous movie based on the current active movie
    // For now, we'll just log a message
    console.log(`Navigating to ${direction} movie`);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && activeMovie) {
        // Open the popup when Enter key is pressed
        setPopupOpen(true);
      } else if (e.key === "ArrowRight") {
        // Handle right arrow key to navigate to the next movie
        navigateMovies("next");
      } else if (e.key === "ArrowLeft") {
        // Handle left arrow key to navigate to the previous movie
        navigateMovies("prev");
      }
    },
    [activeMovie, navigateMovies]
  );

  // Attach the keydown event listener to the document
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div>
      {genres.map((genre, index) => (
        <div key={genre.id}>
          <MovieSlider
            key={genre.id}
            genre={genre}
            movies={moviesByGenre[genre.id] || []}
            selected={index === selectedGenreIndex}
            generateImageUrl={generateImageUrl}
            activeMovie={activeMovie}
            onMovieClick={handleMovieClick}
          />
        </div>
      ))}
      {/* Render the MoviePopup component if the popup is open */}
      {isPopupOpen && activeMovie && (
        <MoviePopup movie={activeMovie} onClose={closePopup} />
      )}
    </div>
  );
};

export default HomePage;
