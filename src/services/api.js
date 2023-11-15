import axios from "axios";

// const API_KEY = "d38aa8716411ef7d8e9054b34a6678ac";
const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=9648&api_key=d38aa8716411ef7d8e9054b34a6678ac&fbclid=IwAR1eyqGDtJSdgxliTA0dblUzUh9VgxmSrwEXa_PFFCDvV3_SXuGQLNfk5wI";

export const login = async (username, password) => {
  try {
    const response = await axios.post(
      "https://t-adria.com/api/login",
      {
        username,
        password,
        mac: "a1:b2:c3:d4:b5",
        device_uid: "TV12345",
        language_id: "2",
        device_type: "SamsungTv",
      },
      {
        headers: {
          reskin: "adria",
          "language-id": "2",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMoviesBasedOnGenreId = async (genreId, page, apiKey) => {
  try {
    const response = await fetch(
      `${apiUrl}/discover/movie?api_key=${apiKey}&language=en-US&page=${page}&with_genres=${genreId}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error("Error fetching movies:", error);
  }
};

export default { login, fetchMoviesBasedOnGenreId };
