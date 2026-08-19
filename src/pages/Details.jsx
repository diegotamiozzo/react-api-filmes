import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMovieDetails } from '../services/tmdbService'

export function Details() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadMovie() {
      if (!id) return
      try {
        setLoading(true)
        const data = await getMovieDetails(id)
        if (data && !data.success && data.id) {
          setMovie(data)
        } else {
          setError('Filme não encontrado.')
        }
      } catch (err) {
        console.error('Erro ao carregar detalhes do filme:', err)
        setError('Erro ao carregar os detalhes do filme.')
      } finally {
        setLoading(false)
      }
    }
    loadMovie()
  }, [id])

  if (loading) {
    return (
      <div className="loading-state">
        <p>Carregando detalhes do filme...</p>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="error-state">
        <p>{error || 'Filme não encontrado.'}</p>
        <Link to="/" className="back-button" style={{ marginTop: '1.5rem' }}>
          ← Voltar para a Início
        </Link>
      </div>
    )
  }

  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A'
  const runtimeHours = movie.runtime ? Math.floor(movie.runtime / 60) : 0
  const runtimeMinutes = movie.runtime ? movie.runtime % 60 : 0
  const runtimeFormatted = movie.runtime ? `${runtimeHours}h ${runtimeMinutes}m` : 'N/A'

  return (
    <div className="page-container">
      <Link to="/" className="back-button">
        ← Voltar
      </Link>
      <div className="details-wrapper">
        {movie.poster_path ? (
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
            className="details-poster"
          />
        ) : (
          <div className="details-poster sem-imagem" style={{ height: '450px' }}>Sem Imagem</div>
        )}
        <div className="details-info">
          <h1 className="details-title">{movie.title}</h1>
          
          <div className="details-meta">
            <span>{releaseYear}</span>
            <span>•</span>
            <span>{runtimeFormatted}</span>
            <span>•</span>
            <span className="nota">★ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="details-genres">
              {movie.genres.map(genre => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>
          )}

          {movie.tagline && (
            <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
              &ldquo;{movie.tagline}&rdquo;
            </p>
          )}

          <h3 style={{ fontSize: '1.2rem', marginTop: '0.5rem', color: 'var(--text-main)' }}>Sinopse</h3>
          <p className="details-overview">{movie.overview || 'Nenhuma sinopse disponível em português.'}</p>
        </div>
      </div>
    </div>
  )
}
