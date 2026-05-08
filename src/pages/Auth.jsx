import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import SeoHead from '../components/SeoHead'

export default function Auth() {
  const [tab, setTab]           = useState('login')       // 'login' | 'register'
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const [success, setSuccess]   = useState(null)

  const { signIn, signUp }  = useAuth()
  const navigate            = useNavigate()
  const location            = useLocation()
  const from                = location.state?.from || '/'

  const resetForm = () => { setError(null); setSuccess(null) }

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null); setSuccess(null)

    if (tab === 'register' && password !== confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      return
    }

    setLoading(true)

    if (tab === 'login') {
      const { error: err } = await signIn(email, password)
      if (err) { setError(translateError(err.message)); setLoading(false); return }
      navigate(from, { replace: true })
    } else {
      const { error: err, data } = await signUp(email, password)
      if (err) { setError(translateError(err.message)); setLoading(false); return }
      // Si email de confirmation nécessaire
      if (data?.user && !data.session) {
        setSuccess('Compte créé ! Vérifie ta boîte mail pour confirmer ton adresse.')
      } else {
        navigate(from, { replace: true })
      }
    }

    setLoading(false)
  }

  return (
    <>
      <SeoHead
        title={tab === 'login' ? 'Connexion — FluxCine' : 'Inscription — FluxCine'}
        description="Connecte-toi ou crée un compte FluxCine."
      />

      <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-5 py-12">

        {/* Orbs de fond */}
        <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)' }}
          />
        </div>

        {/* Back */}
        <div className="w-full max-w-md mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-label-3 hover:text-label-2 text-xs font-medium transition-colors"
          >
            <ArrowLeft size={12} />
            Retour à l'accueil
          </Link>
        </div>

        {/* Card */}
        <div
          className="w-full max-w-md rounded-3xl p-8 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.09) 0%, rgba(9,9,15,0.6) 100%)',
            border: '1px solid rgba(139,92,246,0.18)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
          }}
        >
          {/* Shine */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 45%)' }}
          />

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex justify-center mb-7">
              <Link to="/" className="flex items-center gap-2.5 group" aria-label="FluxCine">
                <div
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.35), rgba(124,58,237,0.5))',
                    border: '1px solid rgba(139,92,246,0.45)',
                    boxShadow: '0 0 24px rgba(139,92,246,0.3)',
                  }}
                >
                  <span className="text-flux-accent2 font-black text-base leading-none">F</span>
                </div>
                <span className="font-bold text-label text-lg tracking-tight">
                  Flux<span className="text-gradient">Cine</span>
                </span>
              </Link>
            </div>

            {/* Tabs */}
            <div
              className="flex gap-1 p-1 rounded-2xl mb-7"
              style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.14)' }}
            >
              {[
                { key: 'login',    label: 'Connexion',   icon: LogIn },
                { key: 'register', label: 'Inscription',  icon: UserPlus },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => { setTab(key); resetForm() }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={tab === key
                    ? { background: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', color: '#fff', boxShadow: '0 0 18px rgba(139,92,246,0.4)' }
                    : { color: 'rgba(196,181,253,0.5)', background: 'transparent' }
                  }
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>

            {/* Titre */}
            <div className="mb-6">
              <h1
                className="text-label font-black leading-tight mb-1"
                style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)', letterSpacing: '-0.04em' }}
              >
                {tab === 'login' ? 'Bon retour 👋' : 'Créer un compte'}
              </h1>
              <p className="text-label-3 text-[13px]">
                {tab === 'login'
                  ? 'Connecte-toi pour accéder à ton espace.'
                  : 'Rejoins FluxCine gratuitement.'}
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-widest text-flux-accent3 mb-1.5">
                  Adresse e-mail
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-label-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="toi@exemple.com"
                    className="input-apple pl-9 w-full"
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-widest text-flux-accent3 mb-1.5">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-label-3 pointer-events-none" />
                  <input
                    type={showPwd ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-apple pl-9 pr-10 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-label-3 hover:text-label-2 transition-colors"
                    aria-label={showPwd ? 'Masquer' : 'Afficher'}
                  >
                    {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Confirmation mdp (inscription) */}
              {tab === 'register' && (
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-widest text-flux-accent3 mb-1.5">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-label-3 pointer-events-none" />
                    <input
                      type={showPwd ? 'text' : 'password'}
                      required
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                      placeholder="••••••••"
                      className="input-apple pl-9 w-full"
                    />
                  </div>
                </div>
              )}

              {/* Erreur */}
              {error && (
                <div
                  className="rounded-xl px-4 py-3 text-sm flex items-start gap-2"
                  style={{ background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.22)', color: '#ff6b6b' }}
                >
                  <span className="mt-0.5 flex-shrink-0">⚠️</span>
                  {error}
                </div>
              )}

              {/* Succès */}
              {success && (
                <div
                  className="rounded-xl px-4 py-3 text-sm flex items-start gap-2"
                  style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.22)', color: '#6ee7b7' }}
                >
                  <span className="mt-0.5 flex-shrink-0">✅</span>
                  {success}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !!success}
                className="btn-primary w-full py-3 mt-2 text-sm"
                style={loading || success ? { opacity: 0.6, cursor: 'not-allowed', transform: 'none' } : {}}
              >
                {loading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'rgba(255,255,255,0.7)', borderTopColor: 'transparent' }} />
                ) : (
                  <>
                    {tab === 'login' ? <LogIn size={14} /> : <Sparkles size={14} />}
                    {tab === 'login' ? 'Se connecter' : 'Créer mon compte'}
                  </>
                )}
              </button>
            </form>

            {/* Switch tab */}
            <p className="text-center text-label-3 text-[12px] mt-5">
              {tab === 'login' ? "Pas encore de compte ? " : "Déjà un compte ? "}
              <button
                onClick={() => { setTab(tab === 'login' ? 'register' : 'login'); resetForm() }}
                className="text-flux-accent2 font-semibold hover:text-flux-accent3 transition-colors"
              >
                {tab === 'login' ? "S'inscrire" : 'Se connecter'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

/* Traduit les messages d'erreur Supabase en français */
function translateError(msg) {
  if (!msg) return 'Une erreur est survenue.'
  const m = msg.toLowerCase()
  if (m.includes('invalid login') || m.includes('invalid credentials'))
    return 'Email ou mot de passe incorrect.'
  if (m.includes('email not confirmed'))
    return 'Confirme ton adresse e-mail avant de te connecter.'
  if (m.includes('user already registered') || m.includes('already been registered'))
    return 'Cet email est déjà utilisé.'
  if (m.includes('rate limit'))
    return 'Trop de tentatives. Réessaie dans quelques instants.'
  if (m.includes('network'))
    return 'Erreur réseau. Vérifie ta connexion.'
  return msg
}
