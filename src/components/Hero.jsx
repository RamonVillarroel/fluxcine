import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Play, Info, Star } from 'lucide-react'
import { getTrending } from '../lib/api'
import { imageUrl, BACKDROP_SIZES, POSTER_SIZES } from '../lib/constants'

export default function Hero() {
  const [movies, setMovies]     = useState([])
  const [current, setCurrent]   = useState(0)
  const [paused, setPaused]     = useState(false)
  const [loading, setLoading]   = useState(true)
  const [visible, setVisible]   = useState(true)

  useEffect(() => {
    getTrending('day')
      .then(d => { setMovies((d.results||[]).slice(0,5)); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const goTo = useCallback((idx) => {
    setVisible(false)
    setTimeout(() => { setCurrent(idx); setVisible(true) }, 260)
  }, [])

  const next = useCallback(() => goTo((current + 1) % movies.length), [current, movies.length, goTo])

  useEffect(() => {
    if (paused || movies.length === 0) return
    const id = setInterval(next, 7000)
    return () => clearInterval(id)
  }, [paused, movies.length, next])

  if (loading) {
    return (
      <div className="w-full rounded-3xl overflow-hidden animate-pulse"
        style={{ height: 'min(85vh, 700px)', background: '#1c1c1e' }} />
    )
  }
  if (!movies.length) return null

  const m     = movies[current]
  const title = m.title || m.name || ''
  const year  = (m.release_date || '').slice(0, 4)
  const score = m.vote_average?.toFixed(1)

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl"
      style={{ height: 'min(85vh, 720px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Backdrops superposés */}
      {movies.map((mv, i) => (
        <div
          key={mv.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={imageUrl(mv.backdrop_path, BACKDROP_SIZES.medium)}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
      ))}

      {/* Gradients Apple TV+ : chaud en bas, léger sur les côtés */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.1) 70%, transparent 100%)' }} />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />

      {/* Contenu */}
      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-14 pb-12 md:pb-16">
        <div
          className="max-w-2xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          {/* Genre / score */}
          <div className="flex items-center gap-3 mb-4">
            {score && (
              <span className="flex items-center gap-1 text-yellow-400 text-xs font-semibold"
                style={{ background: 'rgba(255,214,0,0.12)', border: '1px solid rgba(255,214,0,0.2)', padding: '3px 10px', borderRadius: 99 }}>
                <Star size={10} fill="currentColor" />
                {score}
              </span>
            )}
            {year && <span className="text-label-2 text-xs font-medium">{year}</span>}
          </div>

          {/* Titre */}
          <h1
            className="text-label font-bold mb-4 leading-[1.02]"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.04em' }}
          >
            {title}
          </h1>

          {/* Overview */}
          {m.overview && (
            <p className="text-label-2 text-[15px] leading-relaxed line-clamp-2 mb-7 max-w-lg">
              {m.overview}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <Link to={`/title/${m.id}`} className="btn-primary">
              <Play size={15} fill="currentColor" />
              Voir la fiche
            </Link>
            <Link to={`/title/${m.id}`} className="btn-ghost">
              <Info size={15} />
              Plus d'infos
            </Link>
          </div>
        </div>

        {/* Sélecteur — petits posters + dots */}
        <div className="flex items-center gap-5 mt-8">
          {/* Dots */}
          <div className="flex gap-1.5">
            {movies.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  height: 3,
                  width: i === current ? 24 : 12,
                  borderRadius: 99,
                  background: i === current ? '#00d4ff' : 'rgba(255,255,255,0.25)',
                }}
              />
            ))}
          </div>

          {/* Mini posters desktop */}
          <div className="hidden md:flex gap-2">
            {movies.map((mv, i) => (
              <button
                key={mv.id}
                onClick={() => goTo(i)}
                aria-label={mv.title || mv.name}
                className="transition-all duration-300 overflow-hidden rounded-[8px] flex-shrink-0"
                style={{
                  width: 40, height: 56,
                  opacity: i === current ? 1 : 0.38,
                  outline: i === current ? '2px solid #00d4ff' : 'none',
                  outlineOffset: 2,
                  transform: i === current ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <img
                  src={imageUrl(mv.poster_path, POSTER_SIZES.small)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
