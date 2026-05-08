const SITE_URL = import.meta.env.VITE_SITE_URL || 'http://localhost:5173'

export function buildSeoMeta({ title, description, image, url, type = 'website' }) {
  return {
    title: title || 'FluxCine — Découvrez le meilleur du cinéma',
    description: description || 'Bandes-annonces officielles, infos détaillées et liens vers vos plateformes légales.',
    image: image || `${SITE_URL}/og-default.jpg`,
    url: url || SITE_URL,
    type,
  }
}
