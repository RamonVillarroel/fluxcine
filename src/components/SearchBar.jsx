import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { searchMulti } from '../lib/api'
import { imageUrl, POSTER_SIZES } from '../lib/constants'
import { useDebounce } from '../hooks/useDebounce'

export default function SearchBar({ onClose }) {
  const [query, setQuery]             = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen]               = useState(false)
  const debouncedQuery                = useDebounce(query, 380)
  const navigate                      = useNavigate()
  const containerRef                  = useRef(null)

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) { setSuggestions([]); setOpen(false); return }
    searchMulti(debouncedQuery)
      .then(d => {
        const r = (d.results || []).filter(r => r.media_type !== 'person' && r.poster_path).slice(0, 5)
        setSuggestions(r); setOpen(true)
      }).catch(() => {})
  }, [debouncedQuery])

  useEffect(() => {
    const fn = e => { if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const submit = e => {
    e.preventDefault()
    if (query.trim()) { navigate(`/search?q=${encodeURIComponent(query.trim())}`); setOpen(false); setQuery(''); onClose?.() }
  }
  const select = mv => { navigate(`/title/${mv.id}`); setOpen(false); setQuery(''); onClose?.() }

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={submit} className="relative">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-label-3 pointer-events-none" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher un film…"
          className="input-apple pl-8 pr-8 w-full"
          aria-label="Rechercher"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setSuggestions([]); setOpen(false) }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-label-3 hover:text-label-2 transition-colors"
            aria-label="Effacer"
          >
            <X size={12} />
          </button>
        )}
      </form>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50 animate-scale-in"
          style={{
            background: 'rgba(15,14,26,0.95)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(139,92,246,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(139,92,246,0.1)',
          }}
        >
          {suggestions.map((mv, idx) => {
            const title = mv.title || mv.name || 'Sans titre'
            const year  = (mv.release_date || mv.first_air_date || '').slice(0, 4)
            return (
              <button
                key={mv.id}
                onClick={() => select(mv)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-flux-accent/10"
                style={{ borderBottom: idx < suggestions.length - 1 ? '1px solid rgba(139,92,246,0.08)' : 'none' }}
              >
                <img
                  src={imageUrl(mv.poster_path, POSTER_SIZES.small)}
                  alt=""
                  className="w-8 h-11 object-cover rounded-lg flex-shrink-0"
                  style={{ border: '1px solid rgba(139,92,246,0.15)' }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-label text-[13px] font-medium truncate" style={{ letterSpacing: '-0.01em' }}>{title}</p>
                  {year && <p className="text-label-3 text-[11px] mt-0.5">{year}</p>}
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
