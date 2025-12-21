
import React, { useState, useMemo } from 'react';
import { GAMES } from './constants';
import { Game, Page } from './types';

// Helper: Ad Banner Placeholder
const AdBanner: React.FC = () => (
  <div className="w-full h-32 bg-slate-900 border border-slate-800 flex items-center justify-center mb-8 rounded-lg">
    <span className="text-slate-600 font-bold tracking-widest text-xs">ADVERTISEMENT SPACE</span>
  </div>
);

// Helper: Game Card
const GameCard: React.FC<{ game: Game; onSelect: (g: Game) => void }> = ({ game, onSelect }) => (
  <div 
    onClick={() => onSelect(game)}
    className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer transform hover:-translate-y-1 shadow-lg"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img 
        src={game.thumbnail} 
        alt={game.title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold shadow-xl">
          PLAY NOW
        </span>
      </div>
      <div className="absolute top-2 left-2 bg-slate-950/80 text-emerald-400 text-[10px] px-2 py-1 rounded font-bold uppercase">
        {game.category}
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-lg text-slate-100 group-hover:text-emerald-400 transition-colors truncate">
        {game.title}
      </h3>
      <p className="text-slate-500 text-xs mt-1 line-clamp-1">
        {game.description}
      </p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = useMemo(() => {
    return GAMES.filter(g => 
      g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleBack = () => {
    setActiveGame(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-4 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div 
            onClick={handleBack}
            className="text-2xl font-black tracking-tighter text-white cursor-pointer group flex items-center gap-2"
          >
            <span className="bg-emerald-600 text-white px-2 py-1 rounded leading-none">6X</span>
            <span>CLASSROOM <span className="text-emerald-500">2025</span></span>
          </div>

          {!activeGame && (
            <div className="relative w-full md:w-96">
              <input 
                type="text"
                placeholder="Search 100+ Games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
              <div className="absolute right-3 top-2.5 text-slate-500 text-sm font-bold">
                FIND
              </div>
            </div>
          )}

          {activeGame && (
            <button 
              onClick={handleBack}
              className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-bold transition-all border border-slate-700"
            >
              BACK TO LIST
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full p-4 lg:p-8">
        {!activeGame ? (
          <>
            <AdBanner />
            
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-slate-100 mb-2">Unblocked Games 6x</h1>
              <p className="text-slate-500 max-w-3xl">
                The most reliable source for Classroom 6x games in 2025. Play Slope, 1v1.LOL, and more without any restrictions.
              </p>
            </div>

            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                {filteredGames.map(game => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    onSelect={setActiveGame} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-slate-600 text-xl font-bold italic uppercase tracking-widest">No games found matching your search.</p>
              </div>
            )}

            <div className="mt-20 border-t border-slate-800 pt-12 text-slate-400">
              <h2 className="text-xl font-bold text-slate-200 mb-4">Why Classroom 6x?</h2>
              <div className="grid md:grid-cols-3 gap-8 text-sm">
                <div>
                  <h3 className="font-bold text-emerald-500 mb-2 underline uppercase">100% Unblocked</h3>
                  <p>Our proxies are updated daily to ensure access from any network, even with strict firewalls.</p>
                </div>
                <div>
                  <h3 className="font-bold text-emerald-500 mb-2 underline uppercase">No Installation</h3>
                  <p>All games run directly in your browser using HTML5 and WebGL technology. No downloads required.</p>
                </div>
                <div>
                  <h3 className="font-bold text-emerald-500 mb-2 underline uppercase">Fast Performance</h3>
                  <p>Optimized for low latency and high stability, even on low-spec hardware found in schools.</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="bg-black w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800">
              <iframe 
                src={activeGame.embedUrl} 
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                title={activeGame.title}
              />
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-3xl font-black text-white">{activeGame.title}</h2>
                <div className="flex gap-2 mt-2">
                  <span className="bg-emerald-900/40 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {activeGame.category}
                  </span>
                  <span className="bg-blue-900/40 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Verified 2025
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-lg font-bold text-sm uppercase">
                  FULLSCREEN
                </button>
                <button 
                  onClick={handleBack}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-bold text-sm uppercase"
                >
                  MORE GAMES
                </button>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/50 p-6 rounded-2xl text-slate-400">
              <h4 className="text-slate-200 font-bold mb-2 uppercase text-sm tracking-widest">How to Play</h4>
              <p className="text-sm leading-relaxed">
                {activeGame.description} Use your keyboard and mouse to interact. If the game doesn't load, try refreshing or checking your internet connection. 
                Classroom 6x provides these embeds for educational and recreational purposes during breaks.
              </p>
            </div>

            <AdBanner />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-slate-600 text-sm font-bold uppercase tracking-widest mb-4">
            Classroom 6x Unblocked Games 2025 &copy; All Rights Reserved
          </p>
          <div className="flex justify-center gap-6 text-slate-500 text-xs font-medium uppercase tracking-tighter">
            <span className="cursor-pointer hover:text-emerald-400">Privacy Policy</span>
            <span className="cursor-pointer hover:text-emerald-400">Terms of Use</span>
            <span className="cursor-pointer hover:text-emerald-400">DMCA</span>
            <span className="cursor-pointer hover:text-emerald-400">Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
