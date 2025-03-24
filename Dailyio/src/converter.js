import { useState } from "react";
import "./converter.css";

const Converter = () => {
  const [currencyAmount, setCurrencyAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("Result: ");

  const convertCurrency = () => {
    // Dummy conversion rates
    const conversionRates = {
      INR: { USD: 0.012, EUR: 0.011, GBP: 0.0097, JPY: 1.65 },
      USD: { INR: 82.5, EUR: 0.92, GBP: 0.77, JPY: 130.2 },
      EUR: { INR: 90, USD: 1.09, GBP: 0.84, JPY: 140.5 },
      GBP: { INR: 104, USD: 1.3, EUR: 1.19, JPY: 167.8 },
      JPY: { INR: 0.6, USD: 0.0077, EUR: 0.0071, GBP: 0.006 }
    };

    if (fromCurrency === toCurrency) {
      setResult("Result: " + currencyAmount);
      return;
    }

    const rate = conversionRates[fromCurrency]?.[toCurrency] || 1;
    setResult(`Result: ${(currencyAmount * rate).toFixed(2)} ${toCurrency}`);
  };

  return (
    <div className="converter-container">
      <div className="converter-section">
        <h2>Currency Converter</h2>
        <input
          type="number"
          value={currencyAmount}
          onChange={(e) => setCurrencyAmount(e.target.value)}
          placeholder="Amount"
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
        </select>
        <button className="convert-button" onClick={convertCurrency}>Convert</button>
        <div className="result">{result}</div>
      </div>
    </div>
  );
};

export default Converter;