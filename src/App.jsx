import React, { useState, useEffect } from 'react';

function Table() {
  const [rates, setRates] = useState([]);
  const currencies = ['CAD', 'EUR', 'IDR', 'JPY', 'CHF', 'GBP'];
  const apiKey = import.meta.env.VITE_API_KEY;


  useEffect(() => {
    fetch(`https://api.currencyfreaks.com/latest?apikey=${apiKey}&symbols=${currencies.join(',')}`)
      .then(response => response.json())
      .then(data => {
        const processedRates = currencies.map(currency => {
          const exchangeRate = parseFloat(data.rates[currency]);
          return {
            currency,
            exchangeRate: exchangeRate.toFixed(4),
            weBuy: (exchangeRate * 1.05).toFixed(4),
            weSell: (exchangeRate * 0.95).toFixed(4),
          };
        });
        setRates(processedRates);
      });
  }, []);

  return (
    <div className="container mx-auto text-center mt-5">
      <h1 className="text-white mb-4 text-2xl"></h1>
      <table className="min-w-full  bg-orange-500 text-white border border-gray-300">
        <thead>
          <tr className="bg-orange-500">
            <th className="px-4 py-2 border">Currency</th>
            <th className="px-4 py-2 border">We Buy</th>
            <th className="px-4 py-2 border">Exchange Rate</th>
            <th className="px-4 py-2 border">We Sell</th>
          </tr>
        </thead>
        <tbody>
          {rates.map(rate => (
            <tr key={rate.currency} className="border">
              <td className="px-4 py-2 border">{rate.currency}</td>
              <td className="px-4 py-2 border">{rate.weBuy}</td>
              <td className="px-4 py-2 border">{rate.exchangeRate}</td>
              <td className="px-4 py-2 border">{rate.weSell}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <div className="App bg-orange-500 min-h-screen flex items-center justify-center">
      <Table />
    </div>
  );
}

export default App;
