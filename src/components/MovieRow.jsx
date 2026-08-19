import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { MovieCard } from './MovieCard'

export function MovieRow({ title, filmes }) {
  const rowRef = useRef(null)

  if (!filmes || filmes.length === 0) return null

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollAmount = clientWidth * 0.75
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="movie-row">
      <h2 className="movie-row-title">
        {title}
      </h2>
      <div className="carousel-container">
        <button 
          className="carousel-btn carousel-btn-left" 
          onClick={() => handleScroll('left')}
          aria-label="Rolar para esquerda"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="carousel-track" ref={rowRef}>
          {filmes.map((filme) => (
            <div key={filme.id} className="carousel-item">
              <MovieCard filme={filme} />
            </div>
          ))}
        </div>
        <button 
          className="carousel-btn carousel-btn-right" 
          onClick={() => handleScroll('right')}
          aria-label="Rolar para direita"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

