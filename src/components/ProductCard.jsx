import { useNavigate } from 'react-router-dom'
import './ProductCard.css'

export default function ProductCard({ name, imgSrc, comingSoon, linkTo, featured }) {
  const navigate = useNavigate()

  return (
    <div
      className={`product-card ${featured ? 'product-card--featured' : ''} ${linkTo ? 'product-card--active' : 'product-card--muted'}`}
      onClick={linkTo ? () => navigate(linkTo) : undefined}
      role={linkTo ? 'button' : undefined}
      tabIndex={linkTo ? 0 : undefined}
      onKeyDown={linkTo ? (e) => e.key === 'Enter' && navigate(linkTo) : undefined}
    >
      <div className="product-card__img-wrap">
        <img src={imgSrc} alt={name} className="product-card__img" loading="lazy" />
      </div>

      <div className="product-card__content">
        {comingSoon && (
          <span className="product-card__pill">Coming Soon</span>
        )}
        {linkTo && (
          <span className="product-card__pill product-card__pill--live">Available Now</span>
        )}
        <h3 className="product-card__name">{name}</h3>
      </div>

      {linkTo && (
        <div className="product-card__arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 9h10M9.5 4.5L14 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  )
}
