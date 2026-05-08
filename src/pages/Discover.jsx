import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import MovieGrid from '../components/MovieGrid'
import SeoHead from '../components/SeoHead'
import { discoverMovies, getGenres } from '../lib/api'
import { SORT_OPTIONS } from '../lib/constants'

const YEARS = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i)

export default function Discover() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [genres, setGenres]     = useState([])
  const [movies, setMovies]     = useState([])
  const [page, setPage]         = useState(1)
  const [hasMore, setHasMore]   = useState(true)
  const [loading, setLoading]   = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const loaderRef = useRef(null)

  const genre  = searchParams.get('genre')  || ''
  const year   = searchParams.get('year')   || ''
  const sort   = searchParams.get('sort')   || 'popularity.desc'
  const rating = searchParams.get('rating') || '0'

  const setFilter = (key, val) => {
    setSearchParams(prev => { const n = new URLSearchParams(prev); val ? n.set(key, val) : n.delete(key); return n })
    setMovies([]); setPage(1); setHasMore(true)
  }

  useEffect(() => { getGenres().then(d => setGenres(d.genres || [])).catch(() => {}) }, [])

  useEffect(() => {
    setLoading(true)
    discoverMovies({ genre, year, sort_by: sort, vote_average: rating || undefined, page: 1 })
      .then(d => { setMovies(d.results || []); setHasMore((d.results||[]).length === 20); setLoading(false) })
      .catch(() => setLoading(false))
  }, [genre, year, sort, rating])

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    const next = page + 1
    discoverMovies({ genre, year, sort_by: sort, vote_average: rating || undefined, page: next })
      .then(d => { setMovies(p => [...p, ...(d.results||[])]); setPage(next); setHasMore((d.results||[]).length===20); setLoadingMore(false) })
      .catch(() => setLoadingMore(false))
  }, [loadingMore, hasMore, page, genre, year, sort, rating])

  useEffect(() => {
    const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) loadMore() }, { threshold: 0.1 })
    if (loaderRef.current) obs.observe(loaderRef.current)
    return () => obs.disconnect()
  }, [loadMore])

  const hasFilters = genre || year || rating !== '0' || sort !== 'popularity.desc'

  /* Styles réutilisés pour les labels de filtre */
  const filterLabel = 'text-[11px] font-semibold uppercase tracking-widest mb-2.5 block'

  return (
    <>
      <SeoHead title="Découvrir — FluxCine" description="Explorez des milliers de films par genre, année et note." />

      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-24">

        {/* En-tête */}
        <div className="flex items-center justify-between pt-8 pb-8">
          <h1 className="large-title" style={{ fontSize: 'clamp(1.7rem,3vw,2.4rem)' }}>Découvrir</h1>
          <button onClick={() => setShowFilters(v => !v)} className="md:hidden btn-ghost text-xs gap-1.5 py-2 px-3">
            <SlidersHorizontal size={13} />
            Filtres
          </button>
        </div>

        <div className="flex gap-8">

          {/* Sidebar filtres */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-52 flex-shrink-0`}>
            <div
              className="rounded-2xl p-5 space-y-6 sticky top-20"
              style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.15)', backdropFilter: 'blur(20px)' }}
            >
              {/* Tri */}
              <div>
                <label className={`${filterLabel} text-flux-accent3`}>Trier par</label>
                <select
                  value={sort}
                  onChange={e => setFilter('sort', e.target.value)}
                  className="w-full rounded-xl px-3 py-2 text-label text-[13px] focus:outline-none transition-colors"
                  style={{ background: 'rgba(9,9,15,0.6)', border: '1px solid rgba(139,92,246,0.2)' }}
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>

              {/* Genres */}
              <div>
                <label className={`${filterLabel} text-flux-accent3`}>Genre</label>
                <div className="flex flex-wrap gap-1.5">
                  {genres.map(g => (
                    <button
                      key={g.id}
                      onClick={() => setFilter('genre', genre === String(g.id) ? '' : String(g.id))}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full transition-all duration-150"
                      style={genre === String(g.id)
                        ? { background: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', color: '#fff', border: '1px solid #8b5cf6', boxShadow: '0 0 12px rgba(139,92,246,0.4)' }
                        : { background: 'rgba(139,92,246,0.07)', color: 'rgba(196,181,253,0.7)', border: '1px solid rgba(139,92,246,0.15)' }
                      }
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Année */}
              <div>
                <label className={`${filterLabel} text-flux-accent3`}>Année</label>
                <select
                  value={year}
                  onChange={e => setFilter('year', e.target.value)}
                  className="w-full rounded-xl px-3 py-2 text-label text-[13px] focus:outline-none"
                  style={{ background: 'rgba(9,9,15,0.6)', border: '1px solid rgba(139,92,246,0.2)' }}
                >
                  <option value="">Toutes</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              {/* Note */}
              <div>
                <label className={`${filterLabel} text-flux-accent3`}>
                  Note min. <span className="text-flux-accent2 normal-case tracking-normal">{rating}/10</span>
                </label>
                <input
                  type="range" min="0" max="9" step="1" value={rating}
                  onChange={e => setFilter('rating', e.target.value)}
                  className="w-full accent-[#8b5cf6]"
                  aria-label="Note minimale"
                />
                <div className="flex justify-between text-label-3 text-[10px] mt-1"><span>0</span><span>10</span></div>
              </div>

              {/* Reset */}
              {hasFilters && (
                <button
                  onClick={() => setSearchParams({})}
                  className="w-full flex items-center justify-center gap-1.5 text-[12px] font-medium py-2 rounded-xl transition-all"
                  style={{ background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.2)', color: '#ff453a' }}
                >
                  <X size={12} />Réinitialiser
                </button>
              )}
            </div>
          </aside>

          {/* Grille */}
          <div className="flex-1 min-w-0">
            <MovieGrid movies={movies} loading={loading} skeletonCount={20} />

            {!loading && hasMore && (
              <div ref={loaderRef} className="mt-10 flex justify-center">
                {loadingMore && (
                  <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'rgba(139,92,246,0.8)', borderTopColor: 'transparent' }} />
                )}
              </div>
            )}

            {!loading && !hasMore && movies.length > 0 && (
              <p className="text-center text-label-3 text-[13px] mt-10">Fin du catalogue pour ces critères.</p>
            )}

            {!loading && movies.length === 0 && (
              <div className="text-center py-24">
                <p className="text-label text-lg font-semibold mb-2">Aucun film trouvé</p>
                <p className="text-label-3 text-sm">Essaie d'élargir les critères de recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
