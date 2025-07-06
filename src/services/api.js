import axios from 'axios';

// Use proxy in development, in production you'd use your deployed proxy URL
const API_BASE = import.meta.env.DEV 
  ? 'https://crypto-sphare-backend.onrender.com/api' 
  : '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Accept': 'application/json'
  }
});

// Response interceptor to handle errors
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    
    // Custom error messages based on status code
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 403) {
        throw new Error('API request forbidden. Check your API key and permissions.');
      } else if (status === 429) {
        throw new Error('API rate limit exceeded. Please wait before making more requests.');
      } else if (status === 500) {
        throw new Error('Server error. Please try again later.');
      } else if (data && data.error) {
        throw new Error(data.error);
      }
    } else if (error.request) {
      throw new Error('No response received from server. Check your network connection.');
    }
    
    throw new Error('Request failed. Please try again.');
  }
);

export const fetchCryptocurrencies = async () => {
  try {
    const response = await api.get('/cryptocurrencies');
    return response.data.data.map(crypto => ({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      price: crypto.quote.USD.price,
      percent_change_24h: crypto.quote.USD.percent_change_24h,
      percent_change_7d: crypto.quote.USD.percent_change_7d,
      market_cap: crypto.quote.USD.market_cap,
      volume_24h: crypto.quote.USD.volume_24h,
      circulating_supply: crypto.circulating_supply
    }));
  } catch (error) {
    console.error('API fetchCryptocurrencies error:', error);
    throw new Error(error.message || 'Failed to fetch cryptocurrency data');
  }
};

export const fetchConversion = async (source, amount, target) => {
  try {
    const response = await api.get('/convert', {
      params: {
        source,
        amount,
        target
      }
    });
    
    return {
      amount,
      source,
      target,
      value: response.data.data.quote[target].price,
      last_updated: response.data.data.last_updated
    };
  } catch (error) {
    console.error('API fetchConversion error:', error);
    throw new Error(error.message || 'Conversion failed');
  }
};