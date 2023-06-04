const API_KEY = "c9064d8b82d4f15287b5c1b7cea07159";
const baseURL = "https://api.themoviedb.org/3";

const request = {
  fetchTrending: `${baseURL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${baseURL}/discover/tv?api_key=${API_KEY}&with_netowrks=213`,
  fetchTopRated: `${baseURL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&WITH_GENRES=28`,
  fetchComedyMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&WITH_GENRES=35`,
  fetchHorrorMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&WITH_GENRES=27`,
  fetchRomanceMovies: `${baseURL}/discover/movie?api_key=${API_KEY}&WITH_GENRES=10749`,
  fetchDocumentaries: `${baseURL}/discover/movie?api_key=${API_KEY}&WITH_GENRES=99`,
};

export default request;
