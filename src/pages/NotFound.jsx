import { Link } from 'react-router-dom'
import SeoHead from '../components/SeoHead'

export default function NotFound() {
  return (
    <>
      <SeoHead title="Page introuvable — FluxCine" description="Cette page n'existe pas." />
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6">
        <div
          className="text-label font-black leading-none mb-4 select-none"
          style={{
            fontSize: 'clamp(7rem, 22vw, 14rem)',
            letterSpacing: '-0.06em',
            background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(124,58,237,0.05))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </div>
        <h1 className="text-label font-bold mb-2 text-2xl" style={{ letterSpacing: '-0.03em' }}>Page introuvable</h1>
        <p className="text-label-2 text-sm mb-8 max-w-sm">Cette page n'existe pas ou a été déplacée.</p>
        <Link to="/" className="btn-primary">Retour à l'accueil</Link>
      </div>
    </>
  )
}
