import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import SeoHead from '../components/SeoHead'
import { getTrending, getPopular, getTopRated, getUpcoming, getNowPlaying } from '../lib/api'
import { API_KEY_MISSING } from '../lib/api'

export default function Home() {
  const [rows, setRows] = useState({
    trending: [], popular: [], topRated: [], upcoming: [], nowPlaying: [],
  })
  const [loadingRows, setLoadingRows] = useState(true)

  useEffect(() => {
    if (API_KEY_MISSING) { setLoadingRows(false); return }
    Promise.allSettled([
      getTrending('week'), getPopular('movie'), getTopRated(), getUpcoming(), getNowPlaying(),
    ]).then(([t, p, top, up, now]) => {
      setRows({
        trending:   t.status   === 'fulfilled' ? t.value.results   || [] : [],
        popular:    p.status   === 'fulfilled' ? p.value.results   || [] : [],
        topRated:   top.status === 'fulfilled' ? top.value.results || [] : [],
        upcoming:   up.status  === 'fulfilled' ? up.value.results  || [] : [],
        nowPlaying: now.status === 'fulfilled' ? now.value.results || [] : [],
      })
      setLoadingRows(false)
    })
  }, [])

  return (
    <>
      <SeoHead
        title="FluxCine — Découvrez le meilleur du cinéma"
        description="Bandes-annonces officielles, informations détaillées et liens vers vos plateformes légales."
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24 space-y-14">

        {/* Hero */}
        <div className="pt-4">
          <Hero />
        </div>

        {/* Bandeau Découvrir — Apple-style feature banner */}
        {!API_KEY_MISSING && (
          <div
            className="relative overflow-hidden rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(0,0,0,0) 60%)',
              border: '1px solid rgba(0,212,255,0.14)',
            }}
          >
            <div>
              <p className="text-flux-accent text-[11px] font-semibold uppercase tracking-widest mb-1.5">Catalogue complet</p>
              <h2
                className="text-label font-bold mb-1"
                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', letterSpacing: '-0.03em' }}
              >
                Des milliers de films à découvrir
              </h2>
              <p className="text-label-2 text-[14px]">Filtrez par genre, année, note et bien plus.</p>
            </div>
            <Link to="/discover" className="btn-primary flex-shrink-0 whitespace-nowrap">
              <Compass size={15} />
              Explorer
            </Link>
          </div>
        )}

        {/* Rangées */}
        <MovieRow title="Tendances de la semaine"  movies={rows.trending}   loading={loadingRows} />
        <MovieRow title="Films populaires"          movies={rows.popular}    loading={loadingRows} />
        <MovieRow title="Mieux notés"               movies={rows.topRated}   loading={loadingRows} />
        <MovieRow title="À venir"                   movies={rows.upcoming}   loading={loadingRows} />
        <MovieRow title="Au cinéma en ce moment"    movies={rows.nowPlaying} loading={loadingRows} />
      </div>
    </>
  )
}
