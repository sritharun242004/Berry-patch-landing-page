import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import SocialIcons from '../components/SocialIcons'
import './Home.css'

const products = [
  {
    name: 'Strawberry',
    imgSrc: 'https://images.unsplash.com/photo-1543528176-61b239494933?w=1400&q=85',
    linkTo: '/strawberry',
    featured: true,
  },
  {
    name: 'Raspberry',
    imgSrc: 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=600&q=80',
    comingSoon: true,
  },
  {
    name: 'Blueberry',
    imgSrc: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&q=80',
    comingSoon: true,
  },
  {
    name: 'Strawberry Preserve',
    imgSrc: 'https://images.pexels.com/photos/16115339/pexels-photo-16115339.jpeg?auto=compress&cs=tinysrgb&w=600',
    comingSoon: true,
  },
]

const marqueeItems = [
  'Organically Grown',
  'No Pesticides',
  'Kodaikanal Hills',
  'Lab Certified',
  '2026 Harvest',
  'Camarosa Variety',
  'ICAR-IIHR Tested',
  '130+ Compounds Checked',
]

const credItems = [
  'ICAR-IIHR Certified',
  '130+ Compounds Tested',
  'Zero Pesticide Residue',
  '2026 Harvest · Kodaikanal',
]

export default function Home() {
  const [credIndex, setCredIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCredIndex(i => (i + 1) % credItems.length), 2500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (CSS.supports('animation-timeline', 'view()')) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.anim-fade-up, .anim-fade-in').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const doubled = [...marqueeItems, ...marqueeItems]

  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />

        <div className="hero__topbar">
          <img src="/berry logo.png" alt="The Berry Patch" className="hero__logo" />
          <span className="hero__tag" aria-hidden="true">◆ Organic Farm · Kodaikanal</span>
        </div>

        <div className="hero__content">
          <h1 className="hero__brand">The Berry<br />Patch</h1>
          <p className="hero__tagline">From the hills, to your table.</p>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── Credential strip ── */}
      <div className="cred-strip" aria-label="Certifications">
        {/* Mobile: carousel */}
        <div className="cred-strip__carousel" aria-live="polite">
          <span className="cred-strip__carousel-item">{credItems[credIndex]}</span>
          <div className="cred-strip__dots">
            {credItems.map((_, i) => (
              <span key={i} className={`cred-strip__pip${i === credIndex ? ' active' : ''}`} />
            ))}
          </div>
        </div>
        {/* Desktop: inline list */}
        <div className="cred-strip__list">
          <span>ICAR-IIHR Certified</span>
          <span className="cred-strip__dot" aria-hidden="true" />
          <span>130+ Compounds Tested</span>
          <span className="cred-strip__dot" aria-hidden="true" />
          <span>Zero Pesticide Residue</span>
          <span className="cred-strip__dot" aria-hidden="true" />
          <span>2026 Harvest · Kodaikanal</span>
        </div>
      </div>

      {/* ── Products ── */}
      <section className="products-section anim-fade-up">
        <header className="products-header">
          <span className="eyebrow">What we grow</span>
          <h2 className="products-header__title">Our Products</h2>
          <p className="products-header__desc">
            Small batches, grown slowly. Chosen for flavour, not shelf life — and always chemical-free.
          </p>
        </header>

        <div className="products__grid">
          <ProductCard {...products[0]} />
          <div className="products__aside">
            {products.slice(1).map((p) => <ProductCard key={p.name} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="strip" aria-hidden="true">
        <div className="marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee__track">
              {doubled.map((item, i) => (
                <span key={i} className="marquee__item strip__item">
                  <span className="strip__bullet">◆</span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mission ── */}
      <div className="mission anim-fade-in">
        <p className="mission__text">
          "No shortcuts.<br />No chemicals.<br />Just hills, farmers,<br />and patience."
        </p>
        <p className="mission__attr">— Our promise, every harvest</p>
      </div>

      {/* ── Footer ── */}
      <div className="home-footer">
        <SocialIcons dark />
      </div>
    </div>
  )
}
