import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import SearchBar from './SearchBar'

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/discover', label: 'Découvrir' },
  { to: '/search', label: 'Recherche' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Ferme le menu si resize vers desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(9,9,15,0.78)'
          : 'rgba(9,9,15,0.35)',
        backdropFilter: 'saturate(180%) blur(28px)',
        WebkitBackdropFilter: 'saturate(180%) blur(28px)',
        borderBottom: scrolled
          ? '1px solid rgba(139,92,246,0.18)'
          : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-14 flex items-center gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group" aria-label="FluxCine">
          <div
            className="w-7 h-7 rounded-[8px] flex items-center justify-center transition-all duration-300 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(124,58,237,0.4))',
              border: '1px solid rgba(139,92,246,0.4)',
              boxShadow: '0 0 16px rgba(139,92,246,0.25)',
            }}
          >
            <span className="text-flux-accent2 font-black text-sm leading-none">F</span>
          </div>
          <span className="font-bold text-label text-[15px] hidden sm:block tracking-tight">
            Flux<span className="text-gradient">Cine</span>
          </span>
        </Link>

        {/* Liens desktop */}
        <div className="hidden md:flex items-center gap-0.5 flex-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-flux-accent2 bg-flux-accent/10'
                    : 'text-label-2 hover:text-label hover:bg-white/[0.05]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* SearchBar desktop */}
        <div className="hidden md:block w-60">
          <SearchBar />
        </div>

        {/* Hamburger mobile */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden ml-auto p-2 rounded-xl text-label-2 hover:text-label transition-colors"
          style={{ background: menuOpen ? 'rgba(139,92,246,0.15)' : 'transparent' }}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div
          className="md:hidden animate-fade-in"
          style={{
            background: 'rgba(9,9,15,0.92)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            borderTop: '1px solid rgba(139,92,246,0.15)',
          }}
        >
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-2">
            {/* SearchBar mobile */}
            <SearchBar onClose={() => setMenuOpen(false)} />

            <div style={{ height: 1, background: 'rgba(139,92,246,0.12)', margin: '4px 0' }} />

            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-flux-accent2 bg-flux-accent/12'
                      : 'text-label-2 hover:text-label hover:bg-white/[0.05]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
