import { useEffect, useState } from "react";

export default function StockInfo() {
  const [stockData, setStockData] = useState({});
  const apiKey = import.meta.env.VITE_TWELVEDATA_API_KEY;

  useEffect(() => {
    async function getStockPrices() {
      try {
        const res = await fetch(
          `https://api.twelvedata.com/quote?symbol=AAPL,MSFT,GOOGL&apikey=${apiKey}`
        );
        const data = await res.json();
        console.log(data);
        setStockData(data);
      } catch (err) {
        console.error(`An error occurred: ${err}`);
      }
    }
    getStockPrices();
  }, []);
  return (
    <div>
      <p>...</p>
    </div>
  );
}
