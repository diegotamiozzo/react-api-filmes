import { useState, useEffect } from 'react'
import { MovieCard } from '../components/MovieCard'
import { searchMovies } from '../services/tmdbService'

export function Search() {
  const [query, setQuery] = useState('')
  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const trimmedQuery = query.trim()

  useEffect(() => {
    if (!trimmedQuery) {
      return
    }

    async function fetchResults() {
      try {
        setLoading(true)
        setHasSearched(true)
        const data = await searchMovies(trimmedQuery, page)
        setFilmes(data.results || [])
        setTotalPages(data.total_pages > 500 ? 500 : (data.total_pages || 1))
        setTotalResults(data.total_results || 0)
      } catch (err) {
        console.error('Erro na busca de filmes:', err)
        setFilmes([])
      } finally {
        setLoading(false)
      }
    }

    const delay = setTimeout(() => {
      fetchResults()
    }, 400)

    return () => clearTimeout(delay)
  }, [trimmedQuery, page])

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    setPage(1)
    if (!value.trim()) {
      setFilmes([])
      setLoading(false)
      setHasSearched(false)
      setTotalPages(1)
      setTotalResults(0)
    } else {
      setHasSearched(true)
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="page-container">
      <h1 className="hero-title">Buscar Filmes</h1>
      <p className="hero-subtitle">Encontre seus filmes favoritos digitando o título abaixo.</p>
      
      <input 
        type="text" 
        placeholder="Digite o nome de um filme..." 
        value={query}
        onChange={handleInputChange}
        className="search-input"
        autoFocus
      />

      {totalResults > 0 && (
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Encontrados {totalResults} filmes ({totalPages} páginas)
        </p>
      )}

      {loading && (
        <div className="loading-state">
          <p>Buscando filmes...</p>
        </div>
      )}

      {!loading && hasSearched && filmes.length === 0 && trimmedQuery.length > 0 && (
        <div className="empty-state">
          <p>Nenhum filme encontrado para &ldquo;{query}&rdquo;.</p>
        </div>
      )}

      {!loading && filmes.length > 0 && (
        <>
          <div className="movie-grid">
            {filmes.map((filme) => (
              <MovieCard key={filme.id} filme={filme} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="page-btn" 
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Anterior
              </button>
              
              <span className="page-info">
                Página <strong>{page}</strong> de <strong>{totalPages}</strong>
              </span>

              <button 
                className="page-btn" 
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}


