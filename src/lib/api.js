const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const API_KEY_MISSING = !API_KEY || API_KEY === 'METS_TA_CLE_TMDB_ICI'

// Cache mémoire simple avec TTL 5 minutes
const cache = new Map()
const TTL = 5 * 60 * 1000

function getCached(key) {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.timestamp > TTL) {
    cache.delete(key)
    return null
  }
  return entry.data
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() })
}

// Helper fetch générique vers TMDB
async function tmdb(endpoint, params = {}) {
  const cacheKey = endpoint + JSON.stringify(params)
  const cached = getCached(cacheKey)
  if (cached) return cached

  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('language', 'fr-FR')
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, v)
    }
  })

  if (API_KEY_MISSING) {
    throw new Error('Clé API TMDB manquante. Renseigne VITE_TMDB_API_KEY dans ton fichier .env')
  }

  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error(`TMDB API erreur ${res.status} : ${res.statusText}`)
  }
  const data = await res.json()
  setCache(cacheKey, data)
  return data
}

export function getTrending(window = 'week') {
  return tmdb(`/trending/movie/${window}`)
}

export function getPopular(type = 'movie') {
  return tmdb(`/${type}/popular`)
}

export function getTopRated() {
  return tmdb('/movie/top_rated')
}

export function getUpcoming() {
  return tmdb('/movie/upcoming')
}

export function getNowPlaying() {
  return tmdb('/movie/now_playing')
}

export function getMovieDetails(id) {
  return tmdb(`/movie/${id}`, {
    append_to_response: 'videos,credits,similar,watch/providers,images',
    include_image_language: 'fr,en,null',
  })
}

export function getMovieVideos(id) {
  return tmdb(`/movie/${id}/videos`)
}

export function getWatchProviders(id) {
  return tmdb(`/movie/${id}/watch/providers`)
}

export function searchMulti(query) {
  return tmdb('/search/multi', { query, include_adult: false })
}

export function discoverMovies(filters = {}) {
  const params = {
    sort_by: filters.sort_by || 'popularity.desc',
    'vote_count.gte': 50,
  }
  if (filters.genre) params.with_genres = filters.genre
  if (filters.year) params.primary_release_year = filters.year
  if (filters.vote_average) params['vote_average.gte'] = filters.vote_average
  if (filters.page) params.page = filters.page
  return tmdb('/discover/movie', params)
}

export function getGenres() {
  return tmdb('/genre/movie/list')
}

// Recherche un film sur Archive.org dans la collection feature_films
// Retourne l'URL embed ou null si non trouvé
export async function searchArchiveOrg(title) {
  try {
    const query = encodeURIComponent(`title:(${title}) AND mediatype:movies`)
    const url = `https://archive.org/advancedsearch.php?q=${query}&fl[]=identifier,title&rows=3&output=json&fq[]=collection:feature_films`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    const docs = data?.response?.docs
    if (!docs || docs.length === 0) return null
    // Prend le premier résultat et construit l'URL embed
    const identifier = docs[0].identifier
    return {
      embedUrl: `https://archive.org/embed/${identifier}`,
      title: docs[0].title,
      identifier,
    }
  } catch {
    return null
  }
}
