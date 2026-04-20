import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import CertGallery from '../components/CertGallery'
import SocialIcons from '../components/SocialIcons'
import './Strawberry.css'

const stats = [
  { num: '130+', label: 'Compounds Tested' },
  { num: 'Zero', label: 'Pesticide Residue' },
  { num: '2',    label: 'Test Panels' },
  { num: 'ICAR', label: 'IIHR Accredited' },
]

const labRows = [
  { title: 'Pesticide Residue',   fact: 'Below LOQ',          badge: 'Pass' },
  { title: 'LCMS-MS Panel',       fact: '70+ Compounds',      badge: 'None Detected' },
  { title: 'GCMS-MS Panel',       fact: '60+ Compounds',      badge: 'None Detected' },
  { title: 'Test Method',         fact: 'ICAR-IIHR Protocol', badge: 'TC-16406' },
]

export default function Strawberry() {
  useEffect(() => {
    if (CSS.supports('animation-timeline', 'view()')) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.anim-fade-up, .anim-fade-in').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div>
      <Navbar />

      {/* ── Hero ── */}
      <section className="sb-hero">
        <img
          src="https://images.unsplash.com/photo-1543528176-61b239494933?w=1400&q=85"
          alt="Fresh strawberries from Kodaikanal"
          className="sb-hero__img"
        />
        <div className="sb-hero__overlay" />
        <div className="sb-hero__text">
          <span className="eyebrow eyebrow--light">Kodaikanal · Camarosa Variety</span>
          <h1 className="sb-hero__name">Strawberries</h1>
          <p className="sb-hero__sub">Lab certified · Pesticide free · 2026 Harvest</p>
        </div>
        <div className="sb-hero__num" aria-hidden="true">01</div>
      </section>

      {/* ── Stats ── */}
      <div className="stats-strip">
        {stats.map((s) => (
          <div key={s.label} className="stat-item">
            <div className="stat-item__num">{s.num}</div>
            <div className="stat-item__label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Story ── */}
      <section className="sb-story anim-fade-up">
        <span className="eyebrow">Our Story</span>
        <div className="sb-pullquote">
          <p>
            In the quiet hills of Kodaikanal, The Berry Patch began with a simple idea —
            to grow strawberries the right way.
          </p>
        </div>
        <div className="sb-body">
          <p>
            We work with local farmers — no shortcuts, no chemicals. Grown organically in
            Kodaikanal's cool hills, just as nature intended.
          </p>
          <p>
            We chose the <strong>Camarosa variety</strong> — handpicked and lab-tested by{' '}
            <strong>ICAR-IIHR Bangalore</strong> with zero pesticide residue across 130+ compounds.
          </p>
        </div>
      </section>

      {/* ── Lab Certificate ── */}
      <section className="lab-section anim-fade-up">
        <div className="lab-inner">

          <div className="lab-header">
            <div className="lab-header__left">
              <span className="eyebrow">Independent Verification</span>
              <h2 className="lab-heading">Lab Certified</h2>
              <p className="lab-meta">Report No: FSRL2026-40 · 13 Apr 2026</p>
              <p className="lab-meta">Strawberry 1 kg · Analysed 08–11 Apr 2026</p>
            </div>
            <div className="lab-seal" aria-hidden="true">
              <svg viewBox="0 0 120 120" className="lab-seal__svg">
                <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border)" strokeWidth="1"/>
                <circle cx="60" cy="60" r="46" fill="none" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 5"/>
                <path id="seal-path" d="M60,14 A46,46 0 0,1 106,60 A46,46 0 0,1 60,106 A46,46 0 0,1 14,60 A46,46 0 0,1 60,14" fill="none"/>
                <text fontSize="6.2" letterSpacing="2.8" fill="var(--text-muted)" fontFamily="Outfit,sans-serif" fontWeight="500">
                  <textPath href="#seal-path" startOffset="3%">ICAR-IIHR · BANGALORE · TC-16406 · FOOD SAFETY ·</textPath>
                </text>
                <text x="60" y="52" textAnchor="middle" fontSize="7.5" letterSpacing="1.5" fill="var(--text-muted)" fontFamily="Outfit,sans-serif" fontWeight="500">FOOD SAFETY</text>
                <text x="60" y="67" textAnchor="middle" fontSize="13" fill="var(--ink)" fontFamily="Gloock,serif" fontStyle="italic">Verified</text>
                <text x="60" y="79" textAnchor="middle" fontSize="6.5" letterSpacing="1.2" fill="var(--clay)" fontFamily="Outfit,sans-serif" fontWeight="600">2026</text>
              </svg>
            </div>
          </div>

          <div className="lab-rows">
            {labRows.map((r) => (
              <div key={r.title} className="lab-row">
                <span className="lab-row__title">{r.title}</span>
                <span className="lab-row__fill" aria-hidden="true" />
                <span className="lab-row__fact">{r.fact}</span>
                <span className="lab-row__badge">{r.badge}</span>
              </div>
            ))}
          </div>

          <p className="lab-credit">
            Tested by <strong>Food Safety Referral Laboratory</strong>, ICAR-IIHR, Bangalore
          </p>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="gallery-section anim-fade-up">
        <span className="eyebrow">Documentation</span>
        <h2 className="section-title">Our Test Reports</h2>
        <CertGallery />
      </section>

      {/* ── Footer ── */}
      <div className="sb-footer">
        <SocialIcons dark />
      </div>
    </div>
  )
}
