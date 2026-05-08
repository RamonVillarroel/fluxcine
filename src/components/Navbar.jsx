import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, LogIn, LogOut, User } from 'lucide-react'
import SearchBar from './SearchBar'
import { useAuth } from '../contexts/AuthContext'

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/discover', label: 'Découvrir' },
  { to: '/search', label: 'Recherche' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false)
  const [scrolled, setScrolled]       = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef                   = useRef(null)

  const { user, signOut, loading } = useAuth()
  const navigate                   = useNavigate()
  const location                   = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  // Ferme le dropdown au clic extérieur
  useEffect(() => {
    const fn = e => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const handleSignOut = async () => {
    setDropdownOpen(false)
    await signOut()
    navigate('/')
  }

  const handleLogin = () => {
    setMenuOpen(false)
    navigate('/auth', { state: { from: location.pathname } })
  }

  // Initiale de l'email pour l'avatar
  const initial = user?.email?.charAt(0).toUpperCase() || '?'

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

        {/* Auth — desktop */}
        {!loading && (
          <div className="hidden md:flex items-center flex-shrink-0">
            {user ? (
              /* Avatar + dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(v => !v)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all duration-200 hover:bg-white/[0.05]"
                  aria-label="Menu utilisateur"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', boxShadow: '0 0 12px rgba(139,92,246,0.4)' }}
                  >
                    {initial}
                  </div>
                  <span className="text-label-2 text-[12px] max-w-[110px] truncate hidden lg:block">
                    {user.email}
                  </span>
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 top-[calc(100%+8px)] w-56 rounded-2xl p-1.5 z-50"
                    style={{
                      background: 'rgba(15,14,26,0.96)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      border: '1px solid rgba(139,92,246,0.2)',
                      boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className="px-3 py-2.5 border-b mb-1" style={{ borderColor: 'rgba(139,92,246,0.12)' }}>
                      <p className="text-label text-xs font-semibold truncate">{user.email}</p>
                      <p className="text-label-3 text-[11px] mt-0.5">Connecté</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left"
                      style={{ color: '#ff6b6b' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,69,58,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <LogOut size={13} />
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={handleLogin} className="btn-ghost text-xs py-2 px-3 gap-1.5">
                <LogIn size={13} />
                Se connecter
              </button>
            )}
          </div>
        )}

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
          className="md:hidden"
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

            <div style={{ height: 1, background: 'rgba(139,92,246,0.12)', margin: '4px 0' }} />

            {/* Auth mobile */}
            {!loading && (
              user ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2.5 px-4 py-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' }}
                    >
                      {initial}
                    </div>
                    <span className="text-label-2 text-xs truncate">{user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    style={{ color: '#ff6b6b' }}
                  >
                    <LogOut size={14} />
                    Se déconnecter
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-flux-accent2 transition-colors hover:bg-white/[0.05]"
                >
                  <LogIn size={14} />
                  Se connecter / S'inscrire
                </button>
              )
            )}
          </div>
        </div>
      )}
    </header>
  )
}
