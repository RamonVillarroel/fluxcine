import { Loader2 } from 'lucide-react'

export default function LoadingSpinner({ size = 32, className = '' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2
        size={size}
        className="animate-spin text-flux-accent"
        aria-label="Chargement en cours"
      />
    </div>
  )
}
