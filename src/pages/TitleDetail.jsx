import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Clock, Calendar, Heart, Play, ArrowLeft, Tv, LogIn } from 'lucide-react'
import { getMovieDetails } from '../lib/api'
import { imageUrl, POSTER_SIZES, BACKDROP_SIZES } from '../lib/constants'
import VideoPlayer from '../components/VideoPlayer' 
import WatchProviders from '../components/WatchProviders'
import MovieRow from '../components/MovieRow'
import SeoHead from '../components/SeoHead'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../contexts/AuthContext'

function useFavorites() {
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fluxcine_favs') || '[]') } catch { return [] }
  })
  const toggle = id => setFavs(prev => {
    const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    localStorage.setItem('fluxcine_favs', JSON.stringify(next))
    return next
  })
  return { favs, toggle }
}

export default function TitleDetail() {
  const { id } = useParams()
  const [movie, setMovie]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const { favs, toggle }      = useFavorites()
  const { user }              = useAuth() // On récupère l'état de connexion

  useEffect(() => {
    setLoading(true); setError(null); setMovie(null)
    getMovieDetails(id)
      .then(d => { setMovie(d); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size={36} />
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-flux-accentAlt font-semibold text-sm">{error}</p>
      <Link to="/" className="btn-ghost text-sm">← Retour</Link>
    </div>
  )

  if (!movie) return null

  const isFav   = favs.includes(movie.id)
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min` : null
  const year    = (movie.release_date || '').slice(0, 4)
  const cast    = movie.credits?.cast?.slice(0, 10) || []
  const similar = movie.similar?.results || []
  const backdrop = imageUrl(movie.backdrop_path, BACKDROP_SIZES.medium)

  // On cherche la bande-annonce officielle dans les données TMDB
  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')

  return (
    <>
      <SeoHead
        title={`${movie.title} (${year}) — FluxCine`}
        description={movie.overview || `Découvrez ${movie.title} sur FluxCine.`}
        image={backdrop}
        url={`${import.meta.env.VITE_SITE_URL || ''}/title/${movie.id}`}
        type="video.movie"
      />

      <div className="relative w-full" style={{ height: 350 }}>
        {movie.backdrop_path && (
          <img
            src={backdrop}
            alt=""
            className="w-full h-full object-cover object-top"
            aria-hidden
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, #000 100%)' }}
        />
      </div>

      <div className="w-full px-5 md:px-12 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-label-3 hover:text-label-2 text-xs font-medium mb-6 mt-4 transition-colors"
        >
          <ArrowLeft size={12} />
          Retour
        </Link>

        <div className="flex flex-col sm:flex-row gap-6 mb-10">
          <div className="flex-shrink-0 self-start mx-auto sm:mx-0">
            <img
              src={imageUrl(movie.poster_path, POSTER_SIZES.medium)}
              alt={`Affiche de ${movie.title}`}
              style={{
                width: 140,
                borderRadius: 12,
                boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'block',
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1
              className="text-label font-bold leading-tight mb-1.5"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', letterSpacing: '-0.03em' }}
            >
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-label-3 text-xs italic mb-3">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap items-center gap-2 mb-3">
              {movie.vote_average > 0 && (
                <span
                  className="inline-flex items-center gap-1 text-yellow-400 text-xs font-semibold"
                  style={{
                    background: 'rgba(255,214,0,0.1)',
                    border: '1px solid rgba(255,214,0,0.2)',
                    padding: '3px 8px',
                    borderRadius: 99,
                  }}
                >
                  <Star size={10} fill="currentColor" />
                  {movie.vote_average.toFixed(1)}
                </span>
              )}
              {year && <span className="pill text-xs"><Calendar size={10} />{year}</span>}
              {runtime && <span className="pill text-xs"><Clock size={10} />{runtime}</span>}
            </div>

            {movie.genres?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {movie.genres.map(g => (
                  <span key={g.id} className="pill text-xs">{g.name}</span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <a href="#player" className="btn-primary text-xs py-2 px-4">
                <Play size={12} fill="currentColor" />
                Regarder
              </a>
              <button
                onClick={() => toggle(movie.id)}
                className="btn-ghost text-xs py-2 px-4"
                style={isFav ? { color: '#ff453a', borderColor: 'rgba(255,69,58,0.35)' } : {}}
              >
                <Heart size={12} fill={isFav ? 'currentColor' : 'none'} />
                {isFav ? 'Favori' : 'Favoris'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <div className="flex-1 min-w-0 space-y-10">
            {movie.overview && (
              <section>
                <SectionTitle>Synopsis</SectionTitle>
                <p className="text-label-2 text-sm leading-relaxed">{movie.overview}</p>
              </section>
            )}

            {/* --- LOGIQUE CONDITIONNELLE DU LECTEUR --- */}
            <section id="player" className="scroll-mt-20">
              {user ? (
                // SI CONNECTÉ : On affiche le lecteur de streaming
                <>
                  <SectionTitle>Lecteur Streaming</SectionTitle>
                  <VideoPlayer 
                    tmdbId={movie.id} 
                    type={movie.number_of_seasons ? 'tv' : 'movie'} 
                  />
                </>
              ) : (
                // SI DÉCONNECTÉ : On affiche la bande-annonce + Invitation à se connecter
                <>
                  <SectionTitle>Bande-annonce officielle</SectionTitle>
                  {trailer ? (
                    <div className="relative pt-[56.25%] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${trailer.key}?rel=0&showinfo=0&autoplay=0`}
                        title="Bande-annonce"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    <div className="p-10 text-center bg-zinc-900 rounded-2xl border border-white/5">
                      <p className="text-zinc-500 text-sm">Aucune bande-annonce disponible pour ce titre.</p>
                    </div>
                  )}

                  {/* Bandeau d'incitation à la connexion */}
                  <div className="mt-6 p-5 bg-gradient-to-r from-red-600/20 to-zinc-800/50 rounded-2xl border border-red-600/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/40">
                        <Play size={18} fill="white" className="ml-1" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Prêt à regarder le film complet ?</p>
                        <p className="text-zinc-400 text-[11px]">Connectez-vous pour débloquer les serveurs de streaming VF/VOSTFR.</p>
                      </div>
                    </div>
                    <Link to="/login" className="btn-primary whitespace-nowrap text-xs px-6 py-2.5">
                      <LogIn size={14} />
                      Se connecter
                    </Link>
                  </div>
                </>
              )}
            </section>

            {cast.length > 0 && (
              <section>
                <SectionTitle>Casting</SectionTitle>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                  {cast.map(p => (
                    <div key={p.cast_id || p.id} className="text-center">
                      <div
                        className="mx-auto mb-1.5 overflow-hidden"
                        style={{
                          width: 44, height: 44, borderRadius: 99,
                          background: '#1c1c1e',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {p.profile_path
                          ? <img src={imageUrl(p.profile_path, POSTER_SIZES.small)} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                          : <div className="w-full h-full flex items-center justify-center text-xs text-label-3">👤</div>
                        }
                      </div>
                      <p className="text-label text-[9px] font-semibold leading-tight line-clamp-2">{p.name}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {similar.length > 0 && (
              <section>
                <MovieRow title="Films similaires" movies={similar} />
              </section>
            )}
          </div>

          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-20">
              <section id="providers" className="scroll-mt-20">
                <SectionTitle>Où regarder (Légal)</SectionTitle>
                <WatchProviders tmdbId={movie.id} />
              </section>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

function SectionTitle({ children }) {
  return (
    <div className="mb-4">
      <h2 className="text-label font-semibold mb-2" style={{ fontSize: '1rem', letterSpacing: '-0.02em' }}>
        {children}
      </h2>
      <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
    </div>
  )
}