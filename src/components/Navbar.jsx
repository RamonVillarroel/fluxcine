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
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(0,0,0,0.72)'
          : 'transparent',
        backdropFilter: scrolled ? 'saturate(180%) blur(28px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(28px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center gap-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 group" aria-label="FluxCine">
          <div
            className="w-7 h-7 rounded-[8px] flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #00d4ff22, #00d4ff44)', border: '1px solid rgba(0,212,255,0.3)' }}
          >
            <span className="text-flux-accent font-black text-sm leading-none">F</span>
          </div>
          <span className="font-semibold text-label text-[15px] hidden sm:block tracking-tight">
            Flux<span className="text-flux-accent">Cine</span>
          </span>
        </Link>

        {/* Liens desktop */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-label bg-white/10'
                    : 'text-label-2 hover:text-label hover:bg-white/[0.06]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* SearchBar desktop */}
        <div className="hidden md:block w-56">
          <SearchBar />
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden ml-auto text-label-2 hover:text-label p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
          aria-label={menuOpen ? 'Fermer' : 'Menu'}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Drawer mobile */}
      {menuOpen && (
        <div
          className="md:hidden animate-fade-in"
          style={{
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'saturate(180%) blur(28px)',
            WebkitBackdropFilter: 'saturate(180%) blur(28px)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1.5">
            <SearchBar onClose={() => setMenuOpen(false)} />
            <div className="h-px bg-apple-sep my-2" />
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'text-flux-accent bg-flux-accent/10' : 'text-label-2 hover:text-label hover:bg-white/[0.06]'
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
