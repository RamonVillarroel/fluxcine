import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Play, Info, Star } from 'lucide-react'
import { getTrending } from '../lib/api'
import { imageUrl, BACKDROP_SIZES, POSTER_SIZES } from '../lib/constants'

export default function Hero() {
  const [movies, setMovies]   = useState([])
  const [current, setCurrent] = useState(0)
  const [paused, setPaused]   = useState(false)
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    getTrending('day')
      .then(d => { setMovies((d.results || []).slice(0, 5)); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const goTo = useCallback(idx => {
    setVisible(false)
    setTimeout(() => { setCurrent(idx); setVisible(true) }, 240)
  }, [])

  const next = useCallback(() => goTo((current + 1) % movies.length), [current, movies.length, goTo])

  useEffect(() => {
    if (paused || movies.length === 0) return
    const id = setInterval(next, 7000)
    return () => clearInterval(id)
  }, [paused, movies.length, next])

  if (loading) return (
    <div
      className="w-full rounded-3xl overflow-hidden animate-pulse"
      style={{ height: 'min(82vh, 700px)', background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.1)' }}
    />
  )
  if (!movies.length) return null

  const m     = movies[current]
  const title = m.title || m.name || ''
  const year  = (m.release_date || '').slice(0, 4)
  const score = m.vote_average?.toFixed(1)

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl"
      style={{ height: 'min(82vh, 700px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Backdrops */}
      {movies.map((mv, i) => (
        <div key={mv.id} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === current ? 1 : 0 }}>
          <img src={imageUrl(mv.backdrop_path, BACKDROP_SIZES.medium)} alt="" className="w-full h-full object-cover" aria-hidden />
        </div>
      ))}

      {/* Dégradés de fondu */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #09090f 0%, rgba(9,9,15,0.6) 40%, rgba(9,9,15,0.1) 70%, transparent 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(9,9,15,0.75) 0%, rgba(9,9,15,0.2) 50%, transparent 100%)' }} />
      {/* Teinte violet sur les bords */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(109,40,217,0.15) 0%, transparent 60%)' }} />

      {/* Contenu */}
      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-14 pb-12 md:pb-16">
        <div
          style={{
            maxWidth: 560,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          {/* Score + année */}
          <div className="flex items-center gap-3 mb-4">
            {score && (
              <span
                className="inline-flex items-center gap-1.5 text-yellow-300 text-xs font-bold"
                style={{ background: 'rgba(253,224,71,0.12)', border: '1px solid rgba(253,224,71,0.2)', padding: '3px 10px', borderRadius: 99 }}
              >
                <Star size={10} fill="currentColor" />
                {score}
              </span>
            )}
            {year && <span className="text-label-2 text-xs font-medium tracking-wide">{year}</span>}
          </div>

          {/* Titre */}
          <h1
            className="text-label font-black leading-[1.02] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', letterSpacing: '-0.04em' }}
          >
            {title}
          </h1>

          {/* Overview */}
          {m.overview && (
            <p className="text-label-2 leading-relaxed line-clamp-2 mb-7" style={{ fontSize: 'clamp(13px, 1.5vw, 15px)' }}>
              {m.overview}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <Link to={`/title/${m.id}`} className="btn-primary">
              <Play size={14} fill="currentColor" />
              Voir la fiche
            </Link>
            <Link to={`/title/${m.id}`} className="btn-ghost">
              <Info size={14} />
              Détails
            </Link>
          </div>
        </div>

        {/* Sélecteur dots + mini posters */}
        <div className="flex items-center gap-4 mt-8">
          <div className="flex gap-1.5">
            {movies.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  height: 3,
                  width: i === current ? 28 : 10,
                  borderRadius: 99,
                  background: i === current
                    ? 'linear-gradient(90deg,#8b5cf6,#a78bfa)'
                    : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          <div className="hidden md:flex gap-2 ml-3">
            {movies.map((mv, i) => (
              <button
                key={mv.id}
                onClick={() => goTo(i)}
                aria-label={mv.title || mv.name}
                className="overflow-hidden rounded-[8px] flex-shrink-0 transition-all duration-300"
                style={{
                  width: 38, height: 54,
                  opacity: i === current ? 1 : 0.35,
                  outline: i === current ? '2px solid #8b5cf6' : 'none',
                  outlineOffset: 2,
                  transform: i === current ? 'scale(1.08)' : 'scale(1)',
                  boxShadow: i === current ? '0 0 12px rgba(139,92,246,0.5)' : 'none',
                }}
              >
                <img src={imageUrl(mv.poster_path, POSTER_SIZES.small)} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
