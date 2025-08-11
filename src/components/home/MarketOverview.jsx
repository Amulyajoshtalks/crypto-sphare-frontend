import React from 'react';
import { FaArrowUp, FaArrowDown, FaChartLine, FaExchangeAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MarketOverview = ({ cryptos }) => {
  const totalMarketCap = cryptos.reduce((sum, crypto) => sum + crypto.market_cap, 0);
  const totalVolume24h = cryptos.reduce((sum, crypto) => sum + crypto.volume_24h, 0);
  
  //TODO Find BTC for dominance calculation
  const btc = cryptos.find(c => c.symbol === 'BTC');
  const btcDominance = btc ? (btc.market_cap / totalMarketCap * 100).toFixed(1) : 0;
  
  //TODO Format large numbers
  const formatNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toFixed(2)}`;
  };

  //TODO For Getting market sentiment
  const positive24h = cryptos.filter(c => c.percent_change_24h >= 0).length;
  const marketSentiment = Math.round((positive24h / cryptos.length) * 100);
  
  // TODO For Find top gainer and loser
  const topGainer = [...cryptos].sort((a, b) => b.percent_change_24h - a.percent_change_24h)[0];
  const topLoser = [...cryptos].sort((a, b) => a.percent_change_24h - b.percent_change_24h)[0];

  //TODO Stats cards animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    })
  };

  return (
    
    <motion.div 
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 shadow-xl border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <FaChartLine className="mr-2 text-blue-400" />
          Market Overview
        </h2>
        <div className="text-sm bg-gray-700 px-3 py-1 rounded-full">
          {cryptos.length} coins tracked
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            title: "Total Market Cap", 
            value: formatNumber(totalMarketCap),
            icon: <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <FaChartLine className="text-blue-400" />
            </div>
          },
          { 
            title: "24h Volume", 
            value: formatNumber(totalVolume24h),
            icon: <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <FaExchangeAlt className="text-green-400" />
            </div>
          },
          { 
            title: "BTC Dominance", 
            value: `${btcDominance}%`,
            icon: <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <span className="font-bold text-yellow-400">₿</span>
            </div>
          },
          { 
            title: "Market Sentiment", 
            value: `${marketSentiment}%`,
            icon: <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
              <span className={`text-xl ${marketSentiment >= 50 ? 'text-green-400' : 'text-red-400'}`}>
                {marketSentiment >= 50 ? '📈' : '📉'}
              </span>
            </div>,
            extra: (
              <span className={`ml-2 text-xs px-2 py-1 rounded ${
                marketSentiment >= 50 
                  ? 'bg-green-900/30 text-green-300' 
                  : 'bg-red-900/30 text-red-300'
              }`}>
                {marketSentiment >= 50 ? 'Bullish' : 'Bearish'}
              </span>
            )
          }
        ].map((stat, i) => (
          <motion.div
            key={stat.title}
            className="bg-gray-800/50 p-4 rounded-xl border border-gray-700"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm text-gray-400 mb-1">{stat.title}</h3>
                <div className="flex items-baseline">
                  <p className="text-xl font-bold">{stat.value}</p>
                  {stat.extra}
                </div>
              </div>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-4 rounded-xl border border-emerald-700/30"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-sm text-gray-400 mb-2 flex items-center">
            <FaArrowUp className="text-green-400 mr-2" />
            Top Gainer 24h
          </h3>
          {topGainer && (
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{topGainer.symbol}</p>
                <p className="text-sm text-gray-400">{topGainer.name}</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-bold">
                  +{topGainer.percent_change_24h.toFixed(2)}%
                </p>
                <p className="text-sm">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: topGainer.price < 1 ? 4 : 2
                  }).format(topGainer.price)}
                </p>
              </div>
            </div>
          )}
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-r from-red-900/20 to-rose-900/20 p-4 rounded-xl border border-rose-700/30"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-sm text-gray-400 mb-2 flex items-center">
            <FaArrowDown className="text-red-400 mr-2" />
            Top Loser 24h
          </h3>
          {topLoser && (
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{topLoser.symbol}</p>
                <p className="text-sm text-gray-400">{topLoser.name}</p>
              </div>
              <div className="text-right">
                <p className="text-red-400 font-bold">
                  {topLoser.percent_change_24h.toFixed(2)}%
                </p>
                <p className="text-sm">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: topLoser.price < 1 ? 4 : 2
                  }).format(topLoser.price)}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MarketOverview;