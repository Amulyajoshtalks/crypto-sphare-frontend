import React, { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';
import { motion } from 'framer-motion';
import { FaExchangeAlt, FaInfoCircle } from 'react-icons/fa';

const CryptoConverter = () => {
  const { cryptos, convertCurrency, conversionResult, converting, error } = useCrypto();
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('ETH');
  const [formError, setFormError] = useState('');
  const [recentConversions, setRecentConversions] = useState([]);

  useEffect(() => {
    if (cryptos.length > 0) {
      if (!cryptos.find(c => c.symbol === fromCurrency)) {
        setFromCurrency(cryptos[0].symbol);
      }
      if (!cryptos.find(c => c.symbol === toCurrency)) {
        setToCurrency(cryptos[1].symbol);
      }
    }
  }, [cryptos]);

  //TODO Handle conversion result
  useEffect(() => {
    if (conversionResult) {
      
      setRecentConversions(prev => [
        { 
          id: Date.now(), 
          ...conversionResult,
          timestamp: new Date().toLocaleTimeString()
        },
        ...prev.slice(0, 4) 
      ]);
    }
  }, [conversionResult]);

  const handleConvert = (e) => {
    e.preventDefault();
    
    if (!fromCurrency || !toCurrency) {
      setFormError('Please select both currencies');
      return;
    }
    
    if (amount <= 0 || isNaN(amount)) {
      setFormError('Please enter a valid amount');
      return;
    }
    
    if (fromCurrency === toCurrency) {
      setFormError('Cannot convert the same currency');
      return;
    }
    
    setFormError('');
    convertCurrency(fromCurrency, amount, toCurrency);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: value < 1 ? 6 : 2,
      maximumFractionDigits: value < 1 ? 6 : 2
    }).format(value);
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 shadow-xl mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Crypto Converter</h1>
        <p className="text-blue-200">Instantly convert between cryptocurrencies</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-6 shadow-lg">
          <form onSubmit={handleConvert}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    min="0.00000001"
                    step="any"
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-3 text-gray-400">CRYPTO</span>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">From</label>
                <div className="relative">
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {cryptos.map(crypto => (
                      <option key={`from-${crypto.symbol}`} value={crypto.symbol}>
                        {crypto.symbol} - {crypto.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center items-center pt-6">
                <motion.button
                  type="button"
                  onClick={swapCurrencies}
                  className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Swap currencies"
                >
                  <FaExchangeAlt className="text-xl" />
                </motion.button>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
                <div className="relative">
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {cryptos.map(crypto => (
                      <option key={`to-${crypto.symbol}`} value={crypto.symbol}>
                        {crypto.symbol} - {crypto.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-5 mt-4">
                <motion.button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-800 transition-all flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={converting}
                >
                  {converting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Converting...
                    </div>
                  ) : (
                    "Convert Now"
                  )}
                </motion.button>
              </div>
            </div>
            
            {formError && (
              <motion.div 
                className="mt-4 p-3 bg-red-900/50 rounded-lg text-red-300 flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FaInfoCircle className="mr-2" /> {formError}
              </motion.div>
            )}
            
            {error && (
              <motion.div 
                className="mt-4 p-3 bg-red-900/50 rounded-lg text-red-300 flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FaInfoCircle className="mr-2" /> {error}
              </motion.div>
            )}
          </form>
          
          {conversionResult && (
            <motion.div 
              className="mt-8 p-6 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl border border-emerald-700/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-center mb-4">
                <div className="text-xl font-bold text-emerald-400">Conversion Result</div>
                <div className="text-xs text-emerald-300">As of {new Date().toLocaleTimeString()}</div>
              </div>
              
              <div className="flex justify-center items-baseline mb-4">
                <div className="text-3xl font-bold">
                  {formatCurrency(amount)} {conversionResult.source}
                </div>
                <div className="mx-4 text-gray-400">=</div>
                <div className="text-4xl font-bold text-emerald-300">
                  {formatCurrency(conversionResult.value)} {conversionResult.target}
                </div>
              </div>
              
              <div className="text-center text-gray-400 text-sm">
                1 {conversionResult.source} = {formatCurrency(conversionResult.value / amount)} {conversionResult.target}
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span>Recent Conversions</span>
            <span className="ml-2 bg-blue-600 text-xs px-2 py-1 rounded-full">{recentConversions.length}</span>
          </h2>
          
          {recentConversions.length > 0 ? (
            <div className="space-y-4">
              {recentConversions.map(conv => (
                <motion.div 
                  key={conv.id}
                  className="p-4 bg-gray-700/50 rounded-lg border border-gray-600"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-bold">
                      {formatCurrency(conv.amount)} {conv.source}
                    </div>
                    <div className="text-xs text-gray-400">{conv.timestamp}</div>
                  </div>
                  <div className="flex items-center my-2">
                    <div className="h-px bg-gray-600 flex-grow"></div>
                    <FaExchangeAlt className="mx-2 text-gray-500 text-sm" />
                    <div className="h-px bg-gray-600 flex-grow"></div>
                  </div>
                  <div className="font-bold text-green-400">
                    {formatCurrency(conv.value)} {conv.target}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    1 {conv.source} = {formatCurrency(conv.value / conv.amount)} {conv.target}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="bg-gray-700/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaExchangeAlt className="text-2xl" />
              </div>
              <p>Your conversions will appear here</p>
            </div>
          )}
          
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Popular Conversions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button 
                className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors text-center cursor-pointer"
                onClick={() => {
                  setFromCurrency('BTC');
                  setToCurrency('ETH');
                }}
              >
                <div className="font-medium">BTC → ETH</div>
              </button>
              <button 
                className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors text-center cursor-pointer"
                onClick={() => {
                  setFromCurrency('ETH');
                  setToCurrency('BTC');
                }}
              >
                <div className="font-medium">ETH → BTC</div>
              </button>
              <button 
                className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors text-center cursor-pointer"
                onClick={() => {
                  setFromCurrency('BTC');
                  setToCurrency('USDT');
                }}
              >
                <div className="font-medium">BTC → USDT</div>
              </button>
              <button 
                className="p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors text-center cursor-pointer"
                onClick={() => {
                  setFromCurrency('ETH');
                  setToCurrency('USDT');
                }}
              >
                <div className="font-medium">ETH → USDT</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">About Crypto Conversion</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-blue-400 mb-2">Real-time Exchange Rates</h3>
            <p className="text-gray-400">
              Our converter uses real-time market data to provide you with the most accurate conversion rates. 
              Cryptocurrency prices are highly volatile and can change rapidly.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-blue-400 mb-2">How It Works</h3>
            <p className="text-gray-400">
              Simply enter the amount you want to convert, select the source cryptocurrency, 
              and the target cryptocurrency. Our system will calculate the conversion based 
              on current market rates.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CryptoConverter;