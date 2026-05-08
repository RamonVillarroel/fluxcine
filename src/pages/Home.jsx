import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Compass, Sparkles } from 'lucide-react'
import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import SeoHead from '../components/SeoHead'
import { getTrending, getPopular, getTopRated, getUpcoming, getNowPlaying, API_KEY_MISSING } from '../lib/api'

export default function Home() {
  const [rows, setRows] = useState({ trending: [], popular: [], topRated: [], upcoming: [], nowPlaying: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (API_KEY_MISSING) { setLoading(false); return }
    Promise.allSettled([getTrending('week'), getPopular('movie'), getTopRated(), getUpcoming(), getNowPlaying()])
      .then(([t, p, top, up, now]) => {
        setRows({
          trending:   t.status   === 'fulfilled' ? t.value.results   || [] : [],
          popular:    p.status   === 'fulfilled' ? p.value.results   || [] : [],
          topRated:   top.status === 'fulfilled' ? top.value.results || [] : [],
          upcoming:   up.status  === 'fulfilled' ? up.value.results  || [] : [],
          nowPlaying: now.status === 'fulfilled' ? now.value.results || [] : [],
        })
        setLoading(false)
      })
  }, [])

  return (
    <>
      <SeoHead
        title="FluxCine — Découvrez le meilleur du cinéma"
        description="Bandes-annonces officielles, informations détaillées et liens vers vos plateformes légales."
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-24 space-y-16">

        {/* Hero */}
        <div className="pt-4">
          <Hero />
        </div>

        {/* Bandeau Découvrir — glass card violet */}
        {!API_KEY_MISSING && (
          <div className="glass-card relative overflow-hidden px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Orb décoratif */}
            <div
              aria-hidden
              className="absolute -right-16 -top-16 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
            />
            <div className="relative z-10">
              <span
                className="inline-flex items-center gap-1.5 text-flux-accent3 text-[11px] font-semibold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
                style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}
              >
                <Sparkles size={11} />
                Catalogue complet
              </span>
              <h2
                className="text-label font-black mb-1.5 leading-tight"
                style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)', letterSpacing: '-0.03em' }}
              >
                Des milliers de films à{' '}
                <span className="text-gradient">découvrir</span>
              </h2>
              <p className="text-label-2 text-[13px]">Filtrez par genre, année, note et bien plus encore.</p>
            </div>
            <Link to="/discover" className="btn-primary flex-shrink-0 whitespace-nowrap relative z-10">
              <Compass size={15} />
              Explorer
            </Link>
          </div>
        )}

        {/* Rangées de films */}
        <MovieRow title="Tendances de la semaine"  movies={rows.trending}   loading={loading} />
        <MovieRow title="Films populaires"          movies={rows.popular}    loading={loading} />
        <MovieRow title="Mieux notés"               movies={rows.topRated}   loading={loading} />
        <MovieRow title="À venir"                   movies={rows.upcoming}   loading={loading} />
        <MovieRow title="Au cinéma en ce moment"    movies={rows.nowPlaying} loading={loading} />
      </div>
    </>
  )
}
