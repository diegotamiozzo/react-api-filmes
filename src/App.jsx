import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Search } from './pages/Search'
import { Details } from './pages/Details'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<Details />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

