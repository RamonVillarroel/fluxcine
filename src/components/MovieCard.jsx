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
      aria-label={`Voir ${title}`}
    >
      {/* Poster */}
      <div
        className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 transition-all duration-500 group-hover:-translate-y-2"
        style={{
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          border: '1px solid rgba(139,92,246,0.1)',
        }}
      >
        <img
          src={imageUrl(movie.poster_path, POSTER_SIZES.medium)}
          alt={`Affiche de ${title}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />

        {/* Overlay fondu bas au hover */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: 'linear-gradient(to top, rgba(9,9,15,0.9) 0%, transparent 55%)' }}
        />

        {/* Glow violet au hover */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(139,92,246,0.45), 0 0 40px rgba(139,92,246,0.15)' }}
        />

        {/* Badge rating */}
        {rating && (
          <div
            className="absolute top-2 right-2 flex items-center gap-1 text-[11px] font-bold text-yellow-300 z-10"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '2px 7px', borderRadius: 99 }}
          >
            <Star size={9} fill="currentColor" />
            {rating}
          </div>
        )}
      </div>

      {/* Infos sous la carte */}
      <div className="px-0.5">
        <h3
          className="text-label text-[13px] font-semibold line-clamp-1 leading-tight mb-0.5 group-hover:text-gradient transition-all duration-300"
          style={{ letterSpacing: '-0.01em' }}
        >
          {title}
        </h3>
        {year && <p className="text-label-3 text-[11px] font-medium">{year}</p>}
      </div>
    </Link>
  )
}
