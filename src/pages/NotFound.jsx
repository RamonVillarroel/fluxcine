import { Link } from 'react-router-dom'
import SeoHead from '../components/SeoHead'

export default function NotFound() {
  return (
    <>
      <SeoHead title="Page introuvable — FluxCine" description="Cette page n'existe pas." />
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6">
        <p
          className="font-black text-label leading-none mb-4 select-none"
          style={{ fontSize: 'clamp(6rem, 20vw, 12rem)', letterSpacing: '-0.06em', opacity: 0.06 }}
        >
          404
        </p>
        <h1 className="text-label text-2xl font-bold mb-2" style={{ letterSpacing: '-0.03em' }}>
          Page introuvable
        </h1>
        <p className="text-label-2 text-[15px] mb-8 max-w-sm">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    </>
  )
}
