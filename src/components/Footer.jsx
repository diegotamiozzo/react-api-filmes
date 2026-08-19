import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.png'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
        <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src={logoImg} alt="Logo" className="navbar-logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          CineFlix
        </Link>
        <p>Catálogo de filmes interativo.</p>
        </div>
        <div className="footer-credits">
          <p>Desenvolvido por <strong>Diego Tamiozzo</strong></p>
          <p className="footer-year">© {currentYear} • Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  )
}
