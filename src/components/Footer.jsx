import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.png'

const AUTHOR_NAME = 'Diego Tamiozzo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" aria-label="CineFlix - Página inicial">
            <img src={logoImg} alt="" aria-hidden="true" width={32} height={32} />
            <span>CineFlix</span>
          </Link>
          <p>Catálogo de filmes interativo.</p>
        </div>

        <div className="footer-credits">
          <p>
            Desenvolvido por <strong>{AUTHOR_NAME}</strong>
          </p>
          <p className="footer-year">
            &copy; <time dateTime={String(currentYear)}>{currentYear}</time> &bull; Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
