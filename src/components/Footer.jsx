import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-20 relative">
      {/* Séparateur lumineux violet */}
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.4), transparent)' }} />

      <div
        style={{
          background: 'rgba(9,9,15,0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">

            {/* Branding */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,rgba(139,92,246,0.3),rgba(124,58,237,0.4))', border: '1px solid rgba(139,92,246,0.4)', boxShadow: '0 0 14px rgba(139,92,246,0.2)' }}
                >
                  <span className="text-flux-accent2 font-black text-sm leading-none">F</span>
                </div>
                <span className="text-label font-bold text-[15px] tracking-tight">
                  Flux<span className="text-gradient">Cine</span>
                </span>
              </div>
              <p className="text-label-2 text-[13px] leading-relaxed mb-4 max-w-xs">
                Découvrez le meilleur du cinéma. Bandes-annonces officielles et accès légal à vos plateformes.
              </p>
              <p
                className="text-label-3 text-[11px] leading-relaxed px-3 py-2.5 rounded-xl"
                style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.12)' }}
              >
                Ce produit utilise l'API TMDB mais n'est ni approuvé ni certifié par TMDB.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-flux-accent3 text-[11px] font-semibold uppercase tracking-widest mb-4">Navigation</p>
              <ul className="space-y-2.5">
                {[['/', 'Accueil'], ['/discover', 'Découvrir'], ['/dmca', 'DMCA'], ['/legal', 'Mentions légales'], ['/privacy', 'Confidentialité']].map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="text-label-2 text-[13px] hover:text-flux-accent2 transition-colors duration-150">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sources */}
            <div>
              <p className="text-flux-accent3 text-[11px] font-semibold uppercase tracking-widest mb-4">Sources légales</p>
              <ul className="space-y-2.5">
                {[
                  ['https://www.themoviedb.org', 'The Movie Database'],
                  ['https://archive.org', 'Internet Archive'],
                  ['https://www.justwatch.com', 'JustWatch'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noopener noreferrer"
                      className="text-label-2 text-[13px] hover:text-flux-accent2 transition-colors duration-150"
                    >
                      {label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ height: 1, background: 'rgba(139,92,246,0.1)', marginBottom: 18 }} />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <p className="text-label-3 text-[12px]">© {year} FluxCine. Tous droits réservés.</p>
            <p className="text-label-4 text-[11px]">v1.0.0</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
