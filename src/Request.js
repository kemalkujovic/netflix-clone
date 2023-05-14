const API_KEY = "c9064d8b82d4f15287b5c1b7cea07159";

const request = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_netowrks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&WITH_GENRES=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&WITH_GENRES=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&WITH_GENRES=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&WITH_GENRES=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&WITH_GENRES=99`,
};
