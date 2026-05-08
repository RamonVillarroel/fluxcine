import SeoHead from '../components/SeoHead'

export default function Legal() {
  return (
    <>
      <SeoHead
        title="Mentions légales — FluxCine"
        description="Mentions légales du site FluxCine."
      />
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <article className="prose prose-invert prose-sm md:prose-base max-w-none">
          <h1>Mentions légales</h1>

          <h2>Éditeur du site</h2>
          <p>
            FluxCine est un projet indépendant à but non lucratif.<br />
            Contact : <a href="mailto:contact@fluxcine.xyz" className="text-flux-accent">contact@fluxcine.xyz</a>
          </p>

          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par <strong>Vercel Inc.</strong>, 340 Pine Street, Suite 1002,
            San Francisco, CA 94104, USA — <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-flux-accent">vercel.com</a>
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            FluxCine ne revendique aucun droit sur les données fournies par The Movie Database (TMDB)
            ni sur les œuvres cinématographiques référencées. Toutes les métadonnées (titres, synopsis,
            affiches, notes) sont la propriété de leurs détenteurs respectifs.
          </p>
          <p>
            Ce produit utilise l'API TMDB mais n'est ni approuvé ni certifié par TMDB.
          </p>
          <p>
            Les bandes-annonces sont des contenus officiels mis à disposition par YouTube. Les films
            en domaine public proviennent d'Internet Archive.
          </p>

          <h2>Limitation de responsabilité</h2>
          <p>
            FluxCine fournit uniquement des métadonnées et des liens vers des sources tierces. Nous
            ne sommes pas responsables du contenu des sites externes vers lesquels nous dirigeons
            les utilisateurs.
          </p>

          <h2>Droit applicable</h2>
          <p>
            Le présent site est soumis au droit français. Tout litige sera porté devant les
            tribunaux compétents.
          </p>
        </article>
      </div>
    </>
  )
}
