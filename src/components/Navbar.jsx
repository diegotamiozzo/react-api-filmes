import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.png'

export function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src={logoImg} alt="Logo" className="navbar-logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
        CineFlix
      </Link>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Início</Link>
        <Link to="/search" className="nav-link">Buscar</Link>
      </div>
    </nav>
  )
}