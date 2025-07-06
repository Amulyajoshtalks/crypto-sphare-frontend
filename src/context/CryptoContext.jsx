import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchCryptocurrencies, fetchConversion } from '../services/api';

const CryptoContext = createContext();

export const useCrypto = () => useContext(CryptoContext);

export const CryptoProvider = ({ children }) => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conversionResult, setConversionResult] = useState(null);
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    const getCryptos = async () => {
      try {
        setLoading(true);
        const data = await fetchCryptocurrencies();
        setCryptos(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getCryptos();
    
    const interval = setInterval(getCryptos, 120000);
    return () => clearInterval(interval);
  }, []);

  const convertCurrency = async (source, amount, target) => {
    try {
      setConverting(true);
      const result = await fetchConversion(source, amount, target);
      setConversionResult(result);
      setError(null);
    } catch (err) {
      setError('Conversion failed. Please try again.');
      console.error(err);
    } finally {
      setConverting(false);
    }
  };

  return (
    <CryptoContext.Provider
      value={{
        cryptos,
        loading,
        error,
        conversionResult,
        converting,
        convertCurrency
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};