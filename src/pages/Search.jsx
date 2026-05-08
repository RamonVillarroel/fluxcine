import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import MovieGrid from '../components/MovieGrid'
import SeoHead from '../components/SeoHead'
import { searchMulti } from '../lib/api'

const TABS = [
  { key: 'all', label: 'Tout' },
  { key: 'movie', label: 'Films' },
  { key: 'tv', label: 'Séries' },
]

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    setLoading(true)
    setError(null)
    searchMulti(query)
      .then((data) => {
        setResults((data.results || []).filter((r) => r.media_type !== 'person'))
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [query])

  const filtered = results.filter((r) => {
    if (activeTab === 'all') return true
    return r.media_type === activeTab
  })

  return (
    <>
      <SeoHead
        title={query ? `"${query}" — Recherche FluxCine` : 'Recherche — FluxCine'}
        description={`Résultats de recherche pour "${query}" sur FluxCine.`}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16 pt-6">
        <h1 className="text-2xl md:text-3xl font-bold text-flux-text mb-2">
          {query ? (
            <>Résultats pour <span className="text-flux-accent">"{query}"</span></>
          ) : (
            'Recherche'
          )}
        </h1>

        {results.length > 0 && (
          <p className="text-flux-muted text-sm mb-6">{results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}</p>
        )}

        {/* Onglets */}
        {results.length > 0 && (
          <div className="flex gap-2 mb-6 border-b border-flux-border">
            {TABS.map((tab) => {
              const count = tab.key === 'all' ? results.length : results.filter((r) => r.media_type === tab.key).length
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    activeTab === tab.key
                      ? 'border-flux-accent text-flux-accent'
                      : 'border-transparent text-flux-muted hover:text-flux-text'
                  }`}
                >
                  {tab.label}
                  <span className="ml-1 text-xs">({count})</span>
                </button>
              )
            })}
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-4 text-red-400 text-sm mb-6">
            Erreur : {error}
          </div>
        )}

        {!loading && !error && query && filtered.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <SearchX size={48} className="text-flux-muted mb-4" />
            <p className="text-flux-text text-lg font-semibold mb-2">Aucun résultat</p>
            <p className="text-flux-muted text-sm">
              Aucun résultat pour <span className="text-flux-accent">"{query}"</span>.
              Essayez un autre titre ou vérifiez l'orthographe.
            </p>
          </div>
        )}

        {!query && !loading && (
          <div className="text-center py-20">
            <p className="text-flux-muted text-lg">Utilisez la barre de recherche pour trouver un film ou une série.</p>
          </div>
        )}

        <MovieGrid movies={filtered} loading={loading} skeletonCount={12} />
      </div>
    </>
  )
}
