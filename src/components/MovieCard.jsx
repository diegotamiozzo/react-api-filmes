import { Link } from 'react-router-dom'

export function MovieCard({ filme }) {
  const releaseYear = filme.release_date ? filme.release_date.split('-')[0] : 'N/A'
  const voteAverage = filme.vote_average ? filme.vote_average.toFixed(1) : 'N/A'

  return (
    <Link to={`/movie/${filme.id}`} className="card-filme">
      <div className="poster-wrapper">
        {filme.poster_path ? (
          <img 
            src={`https://image.tmdb.org/t/p/w300${filme.poster_path}`} 
            alt={filme.title} 
            className="poster"
            loading="lazy"
          />
        ) : (
          <div className="sem-imagem">Sem Imagem</div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-title" title={filme.title}>{filme.title}</h3>
        <div className="card-meta">
          <span className="ano">{releaseYear}</span>
          <span className="nota">★ {voteAverage}</span>
        </div>
      </div>
    </Link>
  )
}
