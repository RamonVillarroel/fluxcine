import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start gap-10 mb-10">
          {/* Marque */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-6 h-6 rounded-[6px] flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.25)' }}
              >
                <span className="text-flux-accent font-black text-[11px] leading-none">F</span>
              </div>
              <span className="text-label font-semibold text-sm tracking-tight">
                Flux<span className="text-flux-accent">Cine</span>
              </span>
            </div>
            <p className="text-label-2 text-[13px] leading-relaxed max-w-xs">
              Découvrez le cinéma. Bandes-annonces officielles et accès légal à vos plateformes préférées.
            </p>
          </div>

          {/* Liens en colonnes */}
          <div className="flex gap-16 flex-shrink-0">
            <div>
              <p className="text-label-3 text-[11px] font-semibold uppercase tracking-widest mb-3">Navigation</p>
              <ul className="space-y-2.5">
                {[
                  { to: '/', label: 'Accueil' },
                  { to: '/discover', label: 'Découvrir' },
                  { to: '/dmca', label: 'DMCA' },
                  { to: '/legal', label: 'Mentions légales' },
                  { to: '/privacy', label: 'Confidentialité' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-label-2 text-[13px] hover:text-label transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-label-3 text-[11px] font-semibold uppercase tracking-widest mb-3">Sources</p>
              <ul className="space-y-2.5">
                {[
                  { href: 'https://www.themoviedb.org', label: 'TMDB' },
                  { href: 'https://archive.org', label: 'Internet Archive' },
                  { href: 'https://www.justwatch.com', label: 'JustWatch' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-label-2 text-[13px] hover:text-label transition-colors"
                    >
                      {label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 20 }} />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-label-3 text-[12px]">
            © {year} FluxCine. Ce produit utilise l'API TMDB mais n'est ni approuvé ni certifié par TMDB.
          </p>
          <p className="text-label-4 text-[11px]">v1.0.0</p>
        </div>
      </div>
    </footer>
  )
}
