import { useEffect, useState } from "react";
import StockCard from "./StockCard";

export type StockInformation = {
  symbol: string;
  name: string;
  close: string;
  percent_change: string;
  high: string;
  low: string;
};

type FullApiResponse = {
  [symbol: string]: StockInformation;
};

export default function StockInfo() {
  const [stockData, setStockData] = useState<FullApiResponse | null>(null);
  const apiKey = import.meta.env.VITE_TWELVEDATA_API_KEY;

  useEffect(() => {
    async function getStockPrices() {
      try {
        const res = await fetch(
          `https://api.twelvedata.com/quote?symbol=AAPL,MSFT,GOOGL&apikey=${apiKey}`
        );
        const data = await res.json();
        console.log(data);
        const parsedData = {
          ...data,
        };
        setStockData(data);
      } catch (err) {
        console.error(`An error occurred: ${err}`);
      }
    }
    // getStockPrices();
  }, []);

  const symbols = Object.keys(stockData ?? {});

  if (!stockData) return null;

  const filteredStockData: StockInformation[] = symbols.map((symbol) => {
    const stock: StockInformation = stockData[symbol];
    return {
      symbol: stock.symbol,
      name: stock.name,
      close: stock.close,
      percent_change: stock.percent_change,
      high: stock.high,
      low: stock.low,
    };
  });

  return (
    <div>
      {filteredStockData.map((stock) => (
        <StockCard stock={stock} />
      ))}
    </div>
  );
}
