import { useRef, useState, useEffect, useCallback } from 'react'
import './CertGallery.css'

const images = [
  {
    src: '/proof 1.jpeg',
    alt: 'ICAR-IIHR Test Report page 1 — Pesticide residue results',
  },
  {
    src: '/proof 2.jpeg',
    alt: 'ICAR-IIHR Test Report page 2 — Full compound analysis',
  },
]

function Lightbox({ startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex)
  const touchStartX = useRef(null)

  const prev = () => setIndex(i => Math.max(0, i - 1))
  const next = () => setIndex(i => Math.min(images.length - 1, i + 1))

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (dx > 50) prev()
    else if (dx < -50) next()
  }

  return (
    <div
      className="lb-overlay"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
    >
      <button className="lb-close" onClick={onClose} aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 4l12 12M16 4L4 16" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="lb-frame" onClick={e => e.stopPropagation()}>
        <img src={images[index].src} alt={images[index].alt} className="lb-img" />
      </div>

      {index > 0 && (
        <button className="lb-arrow lb-arrow--left" onClick={e => { e.stopPropagation(); prev() }} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 16L7 10l6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      {index < images.length - 1 && (
        <button className="lb-arrow lb-arrow--right" onClick={e => { e.stopPropagation(); next() }} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <div className="lb-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`lb-dot ${i === index ? 'lb-dot--active' : ''}`}
            onClick={e => { e.stopPropagation(); setIndex(i) }}
            aria-label={`Page ${i + 1}`}
          />
        ))}
      </div>

      <div className="lb-counter">{index + 1} / {images.length}</div>
    </div>
  )
}

export default function CertGallery() {
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveIndex(Number(entry.target.dataset.index))
        })
      },
      { root: track, threshold: 0.5 }
    )
    const slides = track.querySelectorAll('.cert-slide')
    slides.forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [])

  function goTo(index) {
    const track = trackRef.current
    if (!track) return
    const slide = track.querySelectorAll('.cert-slide')[index]
    if (slide) slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return (
    <>
      <div className="cert-gallery">
        <div className="cert-track" ref={trackRef}>
          {images.map((img, i) => (
            <div key={i} className="cert-slide" data-index={i}>
              <img src={img.src} alt={img.alt} className="cert-img" />
            </div>
          ))}
        </div>

        {activeIndex > 0 && (
          <button className="cert-arrow cert-arrow--left" onClick={() => goTo(activeIndex - 1)} aria-label="Previous">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="#2D5A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        {activeIndex < images.length - 1 && (
          <button className="cert-arrow cert-arrow--right" onClick={() => goTo(activeIndex + 1)} aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#2D5A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        <div className="cert-footer">
          <div className="cert-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`cert-dot ${i === activeIndex ? 'cert-dot--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button className="cert-view-btn" onClick={() => setLightboxOpen(true)}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 1h4M1 1v4M12 1h-4M12 1v4M1 12h4M1 12v-4M12 12h-4M12 12v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            View Full
          </button>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox startIndex={activeIndex} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  )
}
