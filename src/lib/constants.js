export const IMG_BASE = 'https://image.tmdb.org/t/p'

export const POSTER_SIZES = {
  small: '/w200',
  medium: '/w500',
  large: '/w780',
  original: '/original',
}

export const BACKDROP_SIZES = {
  small: '/w780',
  medium: '/w1280',
  original: '/original',
}

// Génère une URL d'image TMDB ou un placeholder SVG si le chemin est null
export function imageUrl(path, size = POSTER_SIZES.medium) {
  if (!path) {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Crect width='500' height='750' fill='%23141414'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%232a2a2a' font-size='80' font-family='Inter,sans-serif'%3E🎬%3C/text%3E%3C/svg%3E"
  }
  return `${IMG_BASE}${size}${path}`
}

export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularité' },
  { value: 'vote_average.desc', label: 'Mieux notés' },
  { value: 'release_date.desc', label: 'Plus récents' },
  { value: 'revenue.desc', label: 'Box-office' },
]
