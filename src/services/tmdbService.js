import { fetchFromTMDB } from './api';

// Busca os filmes populares para a Home
export async function getPopularMovies() {
  const data = await fetchFromTMDB('/movie/popular?language=pt-BR&page=1');
  return data?.results || [];
}

// Busca os filmes mais bem avaliados para a Home
export async function getTopRatedMovies() {
  const data = await fetchFromTMDB('/movie/top_rated?language=pt-BR&page=1');
  return data?.results || [];
}

// Busca as próximas estreias para a Home
export async function getUpcomingMovies() {
  const data = await fetchFromTMDB('/movie/upcoming?language=pt-BR&page=1');
  return data?.results || [];
}

// Busca filmes por termo de texto para a página de Search com paginação
export async function searchMovies(query, page = 1) {
  if (!query.trim()) return { results: [], total_pages: 1, total_results: 0 };
  const data = await fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}&language=pt-BR&page=${page}`);
  return data || { results: [], total_pages: 1, total_results: 0 };
}

// Busca os detalhes de um filme específico para a página Details
export async function getMovieDetails(movieId) {
  const data = await fetchFromTMDB(`/movie/${movieId}?language=pt-BR`);
  return data;
}

