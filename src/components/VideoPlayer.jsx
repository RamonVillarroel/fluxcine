import React, { useState } from 'react';

export default function VideoPlayer({ tmdbId, type = 'movie', season = 1, episode = 1 }) {
  const servers = [
    {
      id: 'multiembed',
      label: '🌍 Serveur 1 (Stable - Testez les paramètres Audio)',
      // Tu as confirmé que celui-ci charge bien la vidéo. Il faut chercher la piste VF manuellement.
      url: type === 'movie' 
        ? `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1` 
        : `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1&s=${season}&e=${episode}`
    },
    {
      id: 'vidsrcpm',
      label: '🌍 Serveur 2 (Miroir Anti-Blocage A)',
      // Miroir de Vidsrc qui échappe souvent au blocage DNS français.
      url: type === 'movie' 
        ? `https://vidsrc.pm/embed/movie?tmdb=${tmdbId}` 
        : `https://vidsrc.pm/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`
    },
    {
      id: 'vidsrcxyz',
      label: '🌍 Serveur 3 (Miroir Anti-Blocage B)',
      // Un autre miroir de secours pour Vidsrc.
      url: type === 'movie' 
        ? `https://vidsrc.xyz/embed/movie?tmdb=${tmdbId}` 
        : `https://vidsrc.xyz/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`
    },
    {
      id: 'vidlink',
      label: '🇺🇸 Serveur 4 (Secours 100% Fonctionnel - VO)',
      // Tu as confirmé que celui-ci marche à chaque coup. Parfait pour dépanner.
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
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="text-[10px] text-zinc-400 font-medium whitespace-nowrap bg-zinc-900/50 px-3 py-1.5 rounded-md text-center">
          ⚠️ Note : Si aucune option "Français" n'est disponible dans les paramètres du lecteur (Audio/CC), c'est que le fichier est uniquement en VO.
        </div>
      </div>

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