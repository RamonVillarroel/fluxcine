import SeoHead from '../components/SeoHead'

export default function Privacy() {
  return (
    <>
      <SeoHead
        title="Politique de confidentialité — FluxCine"
        description="Politique de confidentialité et gestion des données personnelles de FluxCine."
      />
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <article className="prose prose-invert prose-sm md:prose-base max-w-none">
          <h1>Politique de confidentialité</h1>

          <h2>Données collectées</h2>
          <p>
            FluxCine collecte très peu de données. Voici ce que nous utilisons :
          </p>
          <ul>
            <li>
              <strong>Favoris (localStorage)</strong> : Les films que vous ajoutez à vos favoris
              sont stockés localement dans votre navigateur via <code>localStorage</code>. Ces
              données ne quittent jamais votre appareil et ne sont pas transmises à nos serveurs.
            </li>
            <li>
              <strong>Requêtes API</strong> : Vos recherches et consultations de fiches films
              génèrent des requêtes vers l'API TMDB. Consultez la{' '}
              <a href="https://www.themoviedb.org/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-flux-accent">
                politique de confidentialité de TMDB
              </a>.
            </li>
          </ul>

          <h2>Cookies</h2>
          <p>
            FluxCine n'utilise pas de cookies propriétaires. Les services tiers intégrés peuvent
            déposer leurs propres cookies :
          </p>
          <ul>
            <li>
              <strong>YouTube (Google)</strong> : Les bandes-annonces sont intégrées via
              youtube-nocookie.com pour limiter le dépôt de cookies tiers.
            </li>
            <li>
              <strong>Google Fonts</strong> : Chargement de la police Inter depuis les serveurs
              Google.
            </li>
          </ul>

          <h2>Services tiers</h2>
          <ul>
            <li>
              <strong>TMDB (The Movie Database)</strong> — métadonnées cinéma.{' '}
              <a href="https://www.themoviedb.org/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-flux-accent">Politique TMDB</a>
            </li>
            <li>
              <strong>Internet Archive</strong> — films en domaine public.{' '}
              <a href="https://archive.org/about/terms" target="_blank" rel="noopener noreferrer" className="text-flux-accent">CGU Archive.org</a>
            </li>
            <li>
              <strong>Google Fonts</strong> — typographie.{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-flux-accent">Politique Google</a>
            </li>
          </ul>

          <h2>Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et
            d'effacement de vos données. Comme nous ne conservons aucune donnée personnelle
            sur nos serveurs, l'exercice de ces droits se fait directement dans votre navigateur
            (effacement du localStorage).
          </p>
          <p>
            Pour toute question : <a href="mailto:contact@fluxcine.xyz" className="text-flux-accent">contact@fluxcine.xyz</a>
          </p>
        </article>
      </div>
    </>
  )
}
