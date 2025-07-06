import React, { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronLeft, FaChevronRight, FaStar, FaRegStar } from 'react-icons/fa';
import MarketOverview from '../components/home/MarketOverview';
import TopMovers from '../components/home/TopMovers';
import CryptoCard from '../components/common/CryptoCard';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import { useMediaQuery } from 'react-responsive';

const HomePage = () => {
  const { cryptos, loading, error } = useCrypto();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('cryptoFavorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'market_cap', direction: 'desc' });
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const itemsPerPage = isMobile ? 6 : 8;
  
  //TODO Handle search with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      const filtered = cryptos.filter(crypto => 
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCryptos(filtered);
      setCurrentPage(1);
    }, 300);
    
    return () => clearTimeout(handler);
  }, [searchTerm, cryptos]);

  //TODO Handle sorting
  useEffect(() => {
    if (sortConfig.key) {
      const sorted = [...filteredCryptos].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
      setFilteredCryptos(sorted);
    }
  }, [sortConfig]);

  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem('cryptoFavorites', JSON.stringify(newFavorites));
  };

  const toggleFavoritesView = () => {
    setShowFavorites(!showFavorites);
    setCurrentPage(1);
  };

  //TODO Get current cryptos for display
  const getCurrentCryptos = () => {
    const displayCryptos = showFavorites 
      ? filteredCryptos.filter(crypto => favorites.includes(crypto.id))
      : filteredCryptos;
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    return displayCryptos.slice(indexOfFirstItem, indexOfLastItem);
  };

  //TODO Handle sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(
    (showFavorites 
      ? filteredCryptos.filter(crypto => favorites.includes(crypto.id)).length 
      : filteredCryptos.length
    ) / itemsPerPage
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <motion.div 
      className="animate-fadeIn pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with search and title */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <motion.h1 
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            Cryptocurrency Market
          </motion.h1>
          <p className="text-gray-400 mt-1">Real-time prices and market trends</p>
        </div>
        
        <div className="w-full md:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      </div>
      
      <MarketOverview cryptos={cryptos} />
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <span>Top Movers</span>
          <motion.span 
            className="ml-2 text-xs bg-gradient-to-r from-blue-600 to-purple-600 px-2 py-1 rounded-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            24h Performance
          </motion.span>
        </h2>
        <TopMovers cryptos={cryptos} />
      </div>
      
      <div className="mt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-bold flex items-center">
              {showFavorites ? (
                <>
                  <span className="text-yellow-400">Favorite Cryptocurrencies</span>
                  <FaStar className="ml-2 text-yellow-400" />
                </>
              ) : (
                "All Cryptocurrencies"
              )}
            </h2>
            <p className="text-gray-400 text-sm">
              Showing {getCurrentCryptos().length} of {showFavorites 
                ? filteredCryptos.filter(crypto => favorites.includes(crypto.id)).length 
                : filteredCryptos.length
              } coins
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={toggleFavoritesView}
              className={`flex items-center px-4 py-2 rounded-lg transition-all cursor-pointer ${
                showFavorites 
                  ? 'bg-yellow-500/20 text-yellow-400' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {showFavorites ? <FaStar className="mr-2" /> : <FaRegStar className="mr-2" />}
              {showFavorites ? 'Show All' : 'Show Favorites'}
            </button>
            
            <div className="flex flex-wrap gap-1 mt-2 md:mt-0 md:ml-2">
              <span className="text-gray-400 text-sm flex items-center md:hidden">Sort:</span>
              <button
                onClick={() => requestSort('market_cap')}
                className={`px-3 py-1 rounded-lg text-sm cursor-pointer ${
                  sortConfig.key === 'market_cap' 
                    ? 'bg-blue-600' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                Market Cap {sortConfig.key === 'market_cap' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => requestSort('percent_change_24h')}
                className={`px-3 py-1 rounded-lg text-sm cursor-pointer ${
                  sortConfig.key === 'percent_change_24h' 
                    ? 'bg-blue-600' 
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                24h Change {sortConfig.key === 'percent_change_24h' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${showFavorites}-${currentPage}`}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {getCurrentCryptos().map(crypto => (
              <CryptoCard 
                key={crypto.id} 
                crypto={crypto} 
                isFavorite={favorites.includes(crypto.id)}
                onToggleFavorite={() => toggleFavorite(crypto.id)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
        
        {getCurrentCryptos().length === 0 && (
          <motion.div 
            className="text-center py-12 bg-gray-800/50 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No cryptocurrencies found</h3>
            <p className="text-gray-400">
              {showFavorites 
                ? "You haven't added any favorites yet" 
                : "Try adjusting your search or filter"
              }
            </p>
          </motion.div>
        )}
        
        {totalPages > 1 && (
          <motion.div 
            className="mt-8 flex justify-center items-center gap-1 sm:gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 bg-gray-800 rounded-lg disabled:opacity-30 hover:bg-gray-700 transition-colors"
              aria-label="Previous page"
            >
              <FaChevronLeft />
            </button>
            
            {currentPage > 2 && (
              <button
                onClick={() => paginate(1)}
                className={`hidden sm:flex w-10 h-10 rounded-lg items-center justify-center ${
                  currentPage === 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                1
              </button>
            )}
            
            {currentPage > 3 && (
              <span className="hidden sm:flex items-center justify-center w-10 h-10 text-gray-500">
                ...
              </span>
            )}
            
            {[...Array(totalPages).keys()]
              .map(number => number + 1)
              .filter(number => 
                number === 1 || 
                number === totalPages || 
                (number >= currentPage - 1 && number <= currentPage + 1)
              )
              .map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    currentPage === number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {number}
                </button>
              ))
            }
            
            {currentPage < totalPages - 2 && (
              <span className="hidden sm:flex items-center justify-center w-10 h-10 text-gray-500">
                ...
              </span>
            )}
            
            {currentPage < totalPages - 1 && (
              <button
                onClick={() => paginate(totalPages)}
                className={`hidden sm:flex w-10 h-10 rounded-lg items-center justify-center ${
                  currentPage === totalPages
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                {totalPages}
              </button>
            )}
            
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-800 rounded-lg disabled:opacity-30 hover:bg-gray-700 transition-colors"
              aria-label="Next page"
            >
              <FaChevronRight />
            </button>
            
            <div className="sm:hidden ml-3 text-gray-400 text-sm">
              Page {currentPage} of {totalPages}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default HomePage;