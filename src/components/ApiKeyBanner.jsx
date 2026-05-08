import { API_KEY_MISSING } from '../lib/api'

export default function ApiKeyBanner() {
  if (!API_KEY_MISSING) return null

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-3 text-center">
      <p className="text-amber-400 text-sm font-medium">
        ⚠️ Clé API TMDB manquante —{' '}
        <span className="text-amber-300">
          Modifie le fichier <code className="bg-amber-500/20 px-1 rounded">.env</code> et remplace{' '}
          <code className="bg-amber-500/20 px-1 rounded">METS_TA_CLE_TMDB_ICI</code> par ta clé obtenue sur{' '}
          <a
            href="https://www.themoviedb.org/settings/api"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            themoviedb.org/settings/api
          </a>
          , puis relance <code className="bg-amber-500/20 px-1 rounded">npm run dev</code>.
        </span>
      </p>
    </div>
  )
}
