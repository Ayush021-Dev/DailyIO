import React, { useState, useEffect } from "react";
import "./converter.css";

const CurrencyConverter = () => {
  const [currencyAmount, setCurrencyAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("Result: ");
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Note: Replace with your actual ExchangeRate-API key
  const API_KEY = '6e775e2f33d6982ad50746fc';

  // Supported currencies
  const currencies = [
    'INR', 'USD', 'EUR', 'GBP', 'JPY', 
    'AUD', 'CAD', 'CHF', 'CNY', 'SAR'
  ];

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
    // Refresh rates every 30 minutes
    const intervalId = setInterval(fetchExchangeRates, 30 * 60 * 1000);
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [fromCurrency, API_KEY]);

  const convertCurrency = () => {
    if (fromCurrency === toCurrency) {
      setResult(`Result: ${currencyAmount}`);
      return;
    }

    if (isLoading) {
      setResult("Fetching latest rates...");
      return;
    }

    if (error) {
      setResult("Error fetching exchange rates");
      return;
    }

    const rate = exchangeRates[toCurrency];
    if (!rate) {
      setResult("Conversion rate not available");
      return;
    }

    const convertedAmount = (currencyAmount * rate).toFixed(2);
    setResult(`Result: ${convertedAmount} ${toCurrency}`);
  };

  return (
    <div className="currency-converter">
      <div className="currency-converter__section">
        <h1 align="center">Currency Converter</h1>
        <input
          className="currency-converter__input"
          type="number"
          value={currencyAmount}
          onChange={(e) => setCurrencyAmount(e.target.value)}
          placeholder="Amount"
          disabled={isLoading}
        />
        <select 
          className="currency-converter__select"
          value={fromCurrency} 
          onChange={(e) => setFromCurrency(e.target.value)}
          disabled={isLoading}
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <select 
          className="currency-converter__select"
          value={toCurrency} 
          onChange={(e) => setToCurrency(e.target.value)}
          disabled={isLoading}
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <button 
          className="currency-converter__button" 
          onClick={convertCurrency}
          disabled={isLoading || !currencyAmount}
        >
          {isLoading ? 'Updating Rates...' : 'Convert'}
        </button>
        <div className="currency-converter__result">{result}</div>
        {error && <div className="currency-converter__error">{error}</div>}
      </div>
    </div>
  );
};

export default CurrencyConverter;