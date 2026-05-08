import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { searchMulti } from '../lib/api'
import { imageUrl, POSTER_SIZES } from '../lib/constants'
import { useDebounce } from '../hooks/useDebounce'

export default function SearchBar({ onClose }) {
  const [query, setQuery]           = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen]             = useState(false)
  const debouncedQuery              = useDebounce(query, 380)
  const navigate                    = useNavigate()
  const inputRef                    = useRef(null)
  const containerRef                = useRef(null)

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) { setSuggestions([]); setOpen(false); return }
    searchMulti(debouncedQuery)
      .then(data => {
        const r = (data.results||[]).filter(r => r.media_type !== 'person' && r.poster_path).slice(0,5)
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
          ref={inputRef}
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher…"
          className="input-apple pl-8 pr-8"
          aria-label="Rechercher un film"
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

      {/* Dropdown Spotlight */}
      {open && suggestions.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-1.5 overflow-hidden animate-scale-in z-50 rounded-2xl"
          style={{
            background: 'rgba(28,28,30,0.92)',
            backdropFilter: 'saturate(180%) blur(28px)',
            WebkitBackdropFilter: 'saturate(180%) blur(28px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.8)',
          }}
        >
          {suggestions.map((mv, idx) => {
            const title = mv.title || mv.name || 'Sans titre'
            const year  = (mv.release_date || mv.first_air_date || '').slice(0, 4)
            return (
              <button
                key={mv.id}
                onClick={() => select(mv)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-white/[0.06]"
                style={{ borderBottom: idx < suggestions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
              >
                <img
                  src={imageUrl(mv.poster_path, POSTER_SIZES.small)}
                  alt=""
                  className="w-8 h-11 object-cover rounded-[6px] flex-shrink-0"
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
