import { API_KEY_MISSING } from '../lib/api'

export default function ApiKeyBanner() {
  if (!API_KEY_MISSING) return null
  return (
    <div style={{ background: 'rgba(234,179,8,0.1)', borderBottom: '1px solid rgba(234,179,8,0.2)', padding: '10px 20px', textAlign: 'center' }}>
      <p className="text-yellow-400 text-sm font-medium">
        ⚠️ Clé TMDB manquante — édite{' '}
        <code style={{ background: 'rgba(234,179,8,0.15)', padding: '1px 6px', borderRadius: 4 }}>.env</code>{' '}
        puis relance{' '}
        <code style={{ background: 'rgba(234,179,8,0.15)', padding: '1px 6px', borderRadius: 4 }}>npm run dev</code>
      </p>
    </div>
  )
}
