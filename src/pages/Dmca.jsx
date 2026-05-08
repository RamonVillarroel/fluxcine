import SeoHead from '../components/SeoHead'

const UPDATED = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })

export default function Dmca() {
  return (
    <>
      <SeoHead
        title="Politique DMCA — FluxCine"
        description="Politique de conformité au Digital Millennium Copyright Act de FluxCine."
      />
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <article className="prose prose-invert prose-sm md:prose-base max-w-none">
          <h1>Politique DMCA</h1>
          <p className="lead">
            FluxCine est conforme au Digital Millennium Copyright Act (DMCA). Notre politique est de
            répondre rapidement à tout avis d'infraction au copyright qui respecte les exigences du
            DMCA et des lois applicables.
          </p>

          <h2>Infractions</h2>
          <p>
            FluxCine <strong>n'héberge aucun fichier vidéo</strong>. Notre service utilise
            exclusivement :
          </p>
          <ul>
            <li>Les métadonnées de l'API TMDB (titres, synopsis, affiches, notes)</li>
            <li>Les bandes-annonces officielles YouTube intégrées via l'API TMDB</li>
            <li>Les liens deeplink vers des fournisseurs légaux (Netflix, Prime Video, Disney+, etc.)</li>
            <li>Les films en domaine public disponibles sur Internet Archive</li>
          </ul>
          <p>
            Si vous estimez que votre œuvre protégée par le droit d'auteur a été utilisée de
            manière illicite, veuillez nous envoyer une notification contenant les éléments suivants :
          </p>
          <ol>
            <li>Signature électronique ou physique du titulaire des droits ou de son représentant légal</li>
            <li>Identification précise de l'œuvre protégée faisant l'objet de l'infraction</li>
            <li>URL exacte du contenu litigieux sur notre site</li>
            <li>Vos coordonnées complètes (nom, adresse, téléphone, e-mail)</li>
            <li>Déclaration de bonne foi selon laquelle l'utilisation n'est pas autorisée</li>
            <li>Déclaration sous serment attestant l'exactitude des informations fournies et votre qualité</li>
          </ol>

          <h2>Notes importantes</h2>
          <ul>
            <li>Les notifications incomplètes ne seront pas traitées.</li>
            <li>
              Les fausses notifications engagent la responsabilité de leur auteur en vertu du
              §512(f) du DMCA.
            </li>
            <li>Les retraits sont effectués sous <strong>48 heures ouvrées</strong> après réception d'une notification valide.</li>
          </ul>

          <h2>Contact</h2>
          <p>
            Pour toute notification DMCA valide, contactez-nous à :{' '}
            <a href="mailto:contact@fluxcine.xyz" className="text-flux-accent hover:underline">
              contact@fluxcine.xyz
            </a>
          </p>

          <hr />
          <p className="text-flux-muted text-sm">Dernière mise à jour : {UPDATED}</p>
        </article>
      </div>
    </>
  )
}
