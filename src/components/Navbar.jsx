import { useNavigate } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar">
      <button className="navbar__back" onClick={() => navigate('/')}>
        <span className="navbar__back-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="navbar__back-label">Home</span>
      </button>

      <div className="navbar__brand">
        <img src="/berry logo.png" alt="The Berry Patch" className="navbar__logo" />
      </div>

      <div className="navbar__spacer" />
    </nav>
  )
}
