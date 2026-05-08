import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Compass, Sparkles, TrendingUp, Star, Clock, PlayCircle, Film } from 'lucide-react'
import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import SeoHead from '../components/SeoHead'
import { getTrending, getPopular, getTopRated, getUpcoming, getNowPlaying, API_KEY_MISSING } from '../lib/api'

/* Séparateur de section avec badge flottant */
function SectionDivider({ icon: Icon, label, accent = false }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full flex-shrink-0"
        style={{
          background: accent
            ? 'linear-gradient(135deg, rgba(139,92,246,0.18), rgba(124,58,237,0.10))'
            : 'rgba(139,92,246,0.08)',
          border: '1px solid rgba(139,92,246,0.2)',
        }}
      >
        {Icon && <Icon size={12} className="text-flux-accent2" />}
        <span className="text-[11px] font-semibold uppercase tracking-widest text-flux-accent3">{label}</span>
      </div>
      <div
        className="flex-1 h-px"
        style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.25) 0%, transparent 100%)' }}
      />
    </div>
  )
}

/* Bento stat card */
function StatCard({ value, label, icon: Icon }) {
  return (
    <div
      className="flex flex-col gap-1 p-4 rounded-2xl"
      style={{
        background: 'rgba(139,92,246,0.06)',
        border: '1px solid rgba(139,92,246,0.12)',
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={13} className="text-flux-accent2" />
        <span className="text-label-3 text-[11px] font-medium uppercase tracking-wider">{label}</span>
      </div>
      <span
        className="font-black text-label"
        style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', letterSpacing: '-0.04em' }}
      >
        {value}
      </span>
    </div>
  )
}

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

      {/* Hero pleine largeur */}
      <Hero />

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-28">

        {/* ── Tendances ────────────────────────────────── */}
        <div className="pt-14">
          <SectionDivider icon={TrendingUp} label="Tendances de la semaine" accent />
          <MovieRow movies={rows.trending} loading={loading} />
        </div>

        {/* ── Bannière Découvrir ────────────────────────── */}
        {!API_KEY_MISSING && (
          <div className="mt-16 mb-2">
            <div
              className="relative overflow-hidden rounded-3xl p-7 md:p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.10) 0%, rgba(124,58,237,0.06) 50%, rgba(9,9,15,0.4) 100%)',
                border: '1px solid rgba(139,92,246,0.20)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              {/* Orbs décoratifs */}
              <div
                aria-hidden
                className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%)' }}
              />
              <div
                aria-hidden
                className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 65%)' }}
              />
              {/* Reflet shine */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%)' }}
              />

              <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">

                {/* Texte + stats */}
                <div className="flex-1 min-w-0">
                  <span
                    className="inline-flex items-center gap-1.5 text-flux-accent3 text-[11px] font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
                    style={{ background: 'rgba(139,92,246,0.14)', border: '1px solid rgba(139,92,246,0.22)' }}
                  >
                    <Sparkles size={11} />
                    Catalogue complet
                  </span>
                  <h2
                    className="text-label font-black leading-tight mb-2"
                    style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', letterSpacing: '-0.04em' }}
                  >
                    Des milliers de films à{' '}
                    <span className="text-gradient">découvrir</span>
                  </h2>
                  <p className="text-label-2 text-sm mb-6 max-w-md">
                    Filtrez par genre, année, note et bien plus encore. Votre prochain film préféré vous attend.
                  </p>

                  {/* Stat pills */}
                  <div className="grid grid-cols-3 gap-3 max-w-sm">
                    <StatCard value="50k+" label="Films" icon={Film} />
                    <StatCard value="10k+" label="Séries" icon={PlayCircle} />
                    <StatCard value="20+" label="Genres" icon={Sparkles} />
                  </div>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0 self-start lg:self-center">
                  <Link
                    to="/discover"
                    className="btn-primary text-base px-7 py-3.5"
                    style={{ fontSize: '0.9rem' }}
                  >
                    <Compass size={17} />
                    Explorer le catalogue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Films populaires ──────────────────────────── */}
        <div className="mt-16">
          <SectionDivider icon={Star} label="Films populaires" />
          <MovieRow movies={rows.popular} loading={loading} />
        </div>

        {/* ── Mieux notés ───────────────────────────────── */}
        <div className="mt-16">
          <SectionDivider icon={Star} label="Mieux notés" />
          <MovieRow movies={rows.topRated} loading={loading} />
        </div>

        {/* ── Séparateur visuel ──────────────────────────── */}
        <div
          className="my-14 h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.25) 30%, rgba(139,92,246,0.25) 70%, transparent 100%)' }}
        />

        {/* ── À venir ────────────────────────────────────── */}
        <div>
          <SectionDivider icon={Clock} label="Prochainement" />
          <MovieRow movies={rows.upcoming} loading={loading} />
        </div>

        {/* ── Au cinéma ──────────────────────────────────── */}
        <div className="mt-16">
          <SectionDivider icon={PlayCircle} label="Au cinéma en ce moment" accent />
          <MovieRow movies={rows.nowPlaying} loading={loading} />
        </div>

      </div>
    </>
  )
}
