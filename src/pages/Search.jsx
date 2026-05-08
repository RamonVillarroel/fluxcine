import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import MovieGrid from '../components/MovieGrid'
import SeoHead from '../components/SeoHead'
import { searchMulti } from '../lib/api'

const TABS = [
  { key: 'all',   label: 'Tout' },
  { key: 'movie', label: 'Films' },
  { key: 'tv',    label: 'Séries' },
]

export default function Search() {
  const [searchParams]        = useSearchParams()
  const query                 = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const [tab, setTab]         = useState('all')

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    setLoading(true); setError(null)
    searchMulti(query)
      .then(d => { setResults((d.results||[]).filter(r => r.media_type !== 'person')); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [query])

  const filtered = results.filter(r => tab === 'all' || r.media_type === tab)

  return (
    <>
      <SeoHead
        title={query ? `"${query}" — FluxCine` : 'Recherche — FluxCine'}
        description={`Résultats pour "${query}" sur FluxCine.`}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-24 pt-8">

        <h1 className="large-title mb-1" style={{ fontSize: 'clamp(1.7rem,3vw,2.4rem)' }}>
          {query
            ? <>Résultats pour <span className="text-gradient">"{query}"</span></>
            : 'Recherche'
          }
        </h1>

        {results.length > 0 && (
          <p className="text-label-3 text-sm mb-6">{results.length} résultat{results.length > 1 ? 's' : ''}</p>
        )}

        {/* Onglets */}
        {results.length > 0 && (
          <div
            className="flex gap-1 mb-8 p-1 rounded-2xl w-fit"
            style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}
          >
            {TABS.map(t => {
              const count = t.key === 'all' ? results.length : results.filter(r => r.media_type === t.key).length
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className="px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={tab === t.key
                    ? { background: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', color: '#fff', boxShadow: '0 0 16px rgba(139,92,246,0.4)' }
                    : { color: 'rgba(196,181,253,0.6)', background: 'transparent' }
                  }
                >
                  {t.label} <span className="opacity-60 text-xs ml-0.5">({count})</span>
                </button>
              )
            })}
          </div>
        )}

        {error && (
          <div className="rounded-2xl p-4 text-sm mb-6" style={{ background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.2)', color: '#ff6b6b' }}>
            Erreur : {error}
          </div>
        )}

        {!loading && !error && query && filtered.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <SearchX size={44} className="text-label-3 mb-4" />
            <p className="text-label text-lg font-bold mb-2" style={{ letterSpacing: '-0.02em' }}>Aucun résultat</p>
            <p className="text-label-2 text-sm max-w-sm">
              Aucun résultat pour <span className="text-flux-accent2">"{query}"</span>.<br />
              Vérifie l'orthographe ou essaie un autre titre.
            </p>
          </div>
        )}

        {!query && !loading && (
          <div className="text-center py-24">
            <p className="text-label-2 text-base">Utilise la barre de recherche pour trouver un film ou une série.</p>
          </div>
        )}

        <MovieGrid movies={filtered} loading={loading} skeletonCount={12} />
      </div>
    </>
  )
}
