import React, { useState } from 'react';

export default function VideoPlayer({ tmdbId, type = 'movie', season = 1, episode = 1 }) {
  const servers = [
    {
      id: 'frembed',
      label: '🇫🇷 Serveur 1 (Frembed - Spécial VF)',
      // Super pour la VF, mais peut parfois se tromper de film sur les Animes.
      url: type === 'movie' 
        ? `https://frembed.pro/api/film.php?id=${tmdbId}` 
        : `https://frembed.pro/api/serie.php?id=${tmdbId}&sa=${season}&epi=${episode}`
    },
    {
      id: 'autoembed',
      label: '🌍 Serveur 2 (Autoembed - Corrigé en .cc)',
      // L'adresse correcte est bien en .cc. C'est un excellent lecteur multi-audio.
      url: type === 'movie' 
        ? `https://player.autoembed.cc/embed/movie/${tmdbId}` 
        : `https://player.autoembed.cc/embed/tv/${tmdbId}/${season}/${episode}`
    },
    {
      id: 'vidsrccc',
      label: '🌍 Serveur 3 (Vidsrc.cc - Multi-Audio)',
      // Très grosse base de données, parfait si le serveur 1 se trompe de film.
      url: type === 'movie' 
        ? `https://vidsrc.cc/v2/embed/movie/${tmdbId}?autoPlay=false` 
        : `https://vidsrc.cc/v2/embed/tv/${tmdbId}/${season}/${episode}?autoPlay=false`
    },
    {
      id: 'vidlink',
      label: '🇺🇸 Serveur 4 (Vidlink - Secours VO)',
      // Toujours stable, mais souvent en anglais uniquement.
      url: type === 'movie' 
        ? `https://vidlink.pro/movie/${tmdbId}?primaryColor=E50914&autoplay=false` 
        : `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}?primaryColor=E50914&autoplay=false`
    }
  ];

  const [activeServer, setActiveServer] = useState(servers[0]);

  const handleServerChange = (e) => {
    const selected = servers.find(s => s.id === e.target.value);
    setActiveServer(selected);
  };

  return (
    <div className="w-full bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-white/5 my-6">
      
      {/* Contrôle du lecteur */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-3 bg-zinc-800/50 border-b border-white/5 gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label htmlFor="server-select" className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider whitespace-nowrap">
            Serveur :
          </label>
          <div className="relative w-full sm:w-auto">
            <select
              id="server-select"
              value={activeServer.id}
              onChange={handleServerChange}
              className="appearance-none bg-zinc-700 text-white text-xs font-bold px-4 py-2 pr-8 rounded-lg border border-zinc-600 outline-none cursor-pointer hover:bg-zinc-600 transition-colors w-full shadow-inner"
            >
              {servers.map((server) => (
                <option key={server.id} value={server.id}>
                  {server.label}
                </option>
              ))}
            </select>
            {/* Icône flèche */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Indication dynamique */}
        <div className="text-[10px] text-zinc-400 font-medium whitespace-nowrap bg-zinc-900/50 px-3 py-1.5 rounded-md text-center">
          {activeServer.id === 'frembed' 
            ? '⚠️ Désactivez votre bloqueur de pub (Adblock) si l\'écran reste noir.' 
            : '💡 Astuce : Cliquez sur l\'icône CC/Audio dans la vidéo pour choisir la langue.'}
        </div>
      </div>

      {/* Iframe Vidéo */}
      <div className="relative pt-[56.25%] bg-black">
        <iframe
          src={activeServer.url}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          frameBorder="0"
          scrolling="no"
          title="FluxCine Player"
        />
      </div>
    </div>
  );
}