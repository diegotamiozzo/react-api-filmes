const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchFromTMDB(endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na requisição à API do TMDb:', error);
    return null;
  }
}