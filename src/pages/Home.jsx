import { useState, useEffect } from 'react'
import { MovieRow } from '../components/MovieRow'
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../services/tmdbService'

export function Home() {
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [popular, topRated, upcoming] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies()
        ])
        setPopularMovies(popular)
        setTopRatedMovies(topRated)
        setUpcomingMovies(upcoming)
      } catch (err) {
        console.error('Erro ao carregar dados da Home:', err)
        setError('Não foi possível carregar os filmes. Verifique sua conexão ou tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="loading-state">
        <p>Carregando catálogo de filmes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="hero-section">
        <h1 className="hero-title">Filmes em Destaque</h1>
        <p className="hero-subtitle">Explore os títulos mais populares, bem avaliados e estreias do momento.</p>
      </div>
      <MovieRow title="🔥 Filmes Populares" filmes={popularMovies} />
      <MovieRow title="⭐ Mais Bem Avaliados" filmes={topRatedMovies} />
      <MovieRow title="🎬 Próximas Estreias" filmes={upcomingMovies} />
    </div>
  )
}
