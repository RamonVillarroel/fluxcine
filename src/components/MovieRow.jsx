import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { imageUrl, POSTER_SIZES } from '../lib/constants'
import MovieCardSkeleton from './MovieCardSkeleton'

function MiniCard({ movie }) {
  const title  = movie.title || movie.name || 'Sans titre'
  const year   = (movie.release_date || movie.first_air_date || '').slice(0, 4)
  const rating = movie.vote_average?.toFixed(1)

  return (
    <Link
      to={`/title/${movie.id}`}
      className="group flex-shrink-0 block"
      style={{ width: 'clamp(120px, 13vw, 156px)' }}
      aria-label={`Voir ${title}`}
    >
      <div
        className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-2.5 transition-all duration-500 group-hover:-translate-y-2"
        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)', border: '1px solid rgba(139,92,246,0.1)' }}
      >
        <img
          src={imageUrl(movie.poster_path, POSTER_SIZES.medium)}
          alt={`Affiche de ${title}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: 'linear-gradient(to top, rgba(9,9,15,0.88) 0%, transparent 50%)' }}
        />
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(139,92,246,0.4)' }}
        />
        {rating && (
          <div
            className="absolute top-2 right-2 flex items-center gap-0.5 text-[10px] font-bold text-yellow-300"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '2px 6px', borderRadius: 99 }}
          >
            <Star size={8} fill="currentColor" />
            {rating}
          </div>
        )}
      </div>
      <p
        className="text-label text-[12px] font-semibold leading-tight line-clamp-1 px-0.5"
        style={{ letterSpacing: '-0.01em' }}
      >
        {title}
      </p>
      {year && <p className="text-label-3 text-[11px] font-medium px-0.5 mt-0.5">{year}</p>}
    </Link>
  )
}

export default function MovieRow({ title, movies = [], loading = false }) {
  const rowRef = useRef(null)
  const [showLeft, setShowLeft]   = useState(false)
  const [showRight, setShowRight] = useState(true)

  const scroll = dir => {
    const el = rowRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -el.clientWidth * 0.7 : el.clientWidth * 0.7, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = rowRef.current
    if (!el) return
    setShowLeft(el.scrollLeft > 4)
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  const ArrowBtn = ({ dir }) => (
    <button
      onClick={() => scroll(dir)}
      className="absolute top-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-label-2 hover:text-label transition-all opacity-0 group-hover/row:opacity-100 duration-200 hover:scale-105"
      style={{
        [dir === 'left' ? 'left' : 'right']: -18,
        transform: 'translateY(-50%)',
        background: 'rgba(15,14,26,0.9)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(139,92,246,0.25)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      }}
      aria-label={dir === 'left' ? 'Défiler à gauche' : 'Défiler à droite'}
    >
      {dir === 'left' ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
    </button>
  )

  return (
    <section className="relative group/row">
      {/* En-tête */}
      <div className="flex items-baseline justify-between mb-5">
        <div className="flex items-center gap-3">
          {/* Accent bar violet dégradé */}
          <div className="w-1 h-5 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(to bottom,#8b5cf6,#6d28d9)' }} />
          <h2 className="section-title">{title}</h2>
        </div>
        {!loading && movies.length > 0 && (
          <Link to="/discover" className="text-flux-accent2 text-xs font-semibold hover:opacity-70 transition-opacity flex-shrink-0 ml-4">
            Voir tout
          </Link>
        )}
      </div>

      {showLeft && <ArrowBtn dir="left" />}
      {showRight && <ArrowBtn dir="right" />}

      <div
        ref={rowRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
      >
        {loading
          ? Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="flex-shrink-0" style={{ width: 'clamp(120px,13vw,156px)' }}>
                <MovieCardSkeleton />
              </div>
            ))
          : movies.map(mv => <MiniCard key={mv.id} movie={mv} />)
        }
      </div>
    </section>
  )
}
