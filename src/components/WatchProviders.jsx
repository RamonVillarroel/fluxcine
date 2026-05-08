import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { getWatchProviders } from '../lib/api'
import { imageUrl, POSTER_SIZES } from '../lib/constants'

function ProviderSection({ label, providers, link }) {
  if (!providers?.length) return null
  return (
    <div className="mb-4">
      <p className="text-label-3 text-[11px] font-semibold uppercase tracking-widest mb-2.5">{label}</p>
      <div className="flex flex-wrap gap-2">
        {providers.map(p => (
          <a
            key={p.provider_id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            title={p.provider_name}
            aria-label={`Regarder sur ${p.provider_name}`}
            className="group relative"
          >
            <img
              src={imageUrl(p.logo_path, POSTER_SIZES.small)}
              alt={p.provider_name}
              className="w-11 h-11 rounded-xl transition-all duration-200 group-hover:scale-105"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </a>
        ))}
      </div>
    </div>
  )
}

export default function WatchProviders({ tmdbId }) {
  const [providers, setProviders] = useState(null)
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    if (!tmdbId) return
    getWatchProviders(tmdbId)
      .then(d => { setProviders(d?.results?.FR || null); setLoading(false) })
      .catch(() => setLoading(false))
  }, [tmdbId])

  if (loading) return (
    <div className="h-24 rounded-2xl animate-pulse" style={{ background: '#1c1c1e' }} />
  )

  if (!providers) return (
    <div
      className="rounded-2xl p-4 text-center"
      style={{ background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <p className="text-label-2 text-[13px] mb-2">Pas encore disponible légalement en France.</p>
      <a
        href="https://www.justwatch.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-flux-accent text-[13px] hover:opacity-70 transition-opacity"
      >
        Vérifier sur JustWatch <ExternalLink size={11} />
      </a>
    </div>
  )

  const link = providers.link || 'https://www.justwatch.com'

  return (
    <div
      className="rounded-2xl p-4"
      style={{ background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <ProviderSection label="Streaming"  providers={providers.flatrate} link={link} />
      <ProviderSection label="Location"   providers={providers.rent}     link={link} />
      <ProviderSection label="Achat"      providers={providers.buy}      link={link} />
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-label-3 text-[11px] hover:text-flux-accent transition-colors mt-1"
      >
        Voir sur JustWatch <ExternalLink size={10} />
      </a>
    </div>
  )
}
