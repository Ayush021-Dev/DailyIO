import React from "react";
import "./stock.css";

const stocks = [
  { symbol: "AAPL", price: "$185.30", change: "+2.45 (+1.34%)", isPositive: true },
  { symbol: "GOOGL", price: "$132.75", change: "-1.20 (-0.90%)", isPositive: false },
  { symbol: "MSFT", price: "$342.60", change: "+3.75 (+1.10%)", isPositive: true },
  { symbol: "AMZN", price: "$142.50", change: "+1.85 (+1.31%)", isPositive: true },
  { symbol: "TSLA", price: "$248.90", change: "-3.40 (-1.35%)", isPositive: false },
];

const stock = () => {
  return (
    <div className="stock-dashboard">
      <h1>Stock Market Tracker</h1>
      <div className="stock-grid">
        {stocks.map((stock) => (
          <div className="stock-card" key={stock.symbol}>
            <div className="stock-symbol">{stock.symbol}</div>
            <div className="stock-price">{stock.price}</div>
            <div className={`stock-change ${stock.isPositive ? "positive" : "negative"}`}>
              {stock.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default stock;
