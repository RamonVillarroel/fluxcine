import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { imageUrl, POSTER_SIZES } from '../lib/constants'

export default function MovieCard({ movie }) {
  if (!movie) return null

  const title  = movie.title || movie.name || 'Sans titre'
  const year   = (movie.release_date || movie.first_air_date || '').slice(0, 4)
  const rating = movie.vote_average?.toFixed(1)

  return (
    <Link
      to={`/title/${movie.id}`}
      className="group block"
      aria-label={`Voir la fiche de ${title}`}
    >
      {/* Poster */}
      <div
        className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 transition-all duration-500"
        style={{
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          willChange: 'transform',
        }}
      >
        <img
          src={imageUrl(movie.poster_path, POSTER_SIZES.medium)}
          alt={`Affiche de ${title}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        {/* Overlay très subtil au hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)',
            opacity: 0,
          }}
          ref={el => {
            if (!el) return
            el.closest('.group')?.addEventListener('mouseenter', () => { el.style.opacity = 1 })
            el.closest('.group')?.addEventListener('mouseleave', () => { el.style.opacity = 0 })
          }}
        />

        {/* Badge rating */}
        {rating && (
          <div
            className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[11px] font-semibold text-yellow-400"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '3px 7px', borderRadius: 99 }}
          >
            <Star size={9} fill="currentColor" />
            {rating}
          </div>
        )}
      </div>

      {/* Infos sous la carte — style Apple TV */}
      <div className="px-0.5">
        <h3
          className="text-label text-[13px] font-semibold leading-tight line-clamp-1 mb-0.5"
          style={{ letterSpacing: '-0.01em' }}
        >
          {title}
        </h3>
        {year && (
          <p className="text-label-3 text-[12px] font-medium">{year}</p>
        )}
      </div>
    </Link>
  )
}
