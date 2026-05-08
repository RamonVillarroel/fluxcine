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
      style={{ width: 'clamp(128px, 14vw, 168px)' }}
      aria-label={`Voir ${title}`}
    >
      <div
        className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-2.5 transition-transform duration-500 group-hover:scale-[1.04]"
        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
      >
        <img
          src={imageUrl(movie.poster_path, POSTER_SIZES.medium)}
          alt={`Affiche de ${title}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {rating && (
          <div
            className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-semibold text-yellow-400"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '2px 6px', borderRadius: 99 }}
          >
            <Star size={8} fill="currentColor" />
            {rating}
          </div>
        )}
      </div>
      <p className="text-label text-[12px] font-semibold leading-tight line-clamp-1 px-0.5"
        style={{ letterSpacing: '-0.01em' }}>
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

  return (
    <section className="relative group/row">
      {/* En-tête section — style Apple TV */}
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="section-title">{title}</h2>
        {!loading && movies.length > 0 && (
          <Link
            to="/discover"
            className="text-flux-accent text-sm font-medium hover:opacity-70 transition-opacity flex-shrink-0 ml-4"
          >
            Voir tout
          </Link>
        )}
      </div>

      {/* Flèche gauche */}
      {showLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute -left-5 top-1/2 translate-y-1 z-10 w-10 h-10 rounded-full flex items-center justify-center text-label-2 hover:text-label transition-all opacity-0 group-hover/row:opacity-100 duration-200"
          style={{ background: 'rgba(28,28,30,0.9)', backdropFilter: 'blur(12px)', boxShadow: '0 4px 16px rgba(0,0,0,0.6)' }}
          aria-label="Défiler à gauche"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Flèche droite */}
      {showRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute -right-5 top-1/2 translate-y-1 z-10 w-10 h-10 rounded-full flex items-center justify-center text-label-2 hover:text-label transition-all opacity-0 group-hover/row:opacity-100 duration-200"
          style={{ background: 'rgba(28,28,30,0.9)', backdropFilter: 'blur(12px)', boxShadow: '0 4px 16px rgba(0,0,0,0.6)' }}
          aria-label="Défiler à droite"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Scroll horizontal */}
      <div
        ref={rowRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
      >
        {loading
          ? Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="flex-shrink-0" style={{ width: 'clamp(128px, 14vw, 168px)' }}>
                <MovieCardSkeleton />
              </div>
            ))
          : movies.map(mv => <MiniCard key={mv.id} movie={mv} />)
        }
      </div>
    </section>
  )
}
