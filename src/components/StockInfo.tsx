import { useEffect, useState } from "react";

type StockInfo = {
  symbol: string;
  name: string;
  close: string;
  percent_change: string;
  high: string;
  low: string;
};

type FullApiResponse = {
  [symbol: string]: StockInfo;
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
        setStockData(data);
      } catch (err) {
        console.error(`An error occurred: ${err}`);
      }
    }
    // getStockPrices();
  }, []);

  const symbols = Object.keys(stockData ?? {});

  if (!stockData) return null;

  const filteredStockData: StockInfo[] = symbols.map((symbol) => {
    const stock: StockInfo = stockData[symbol];
    return {
      symbol: stock.symbol,
      name: stock.name,
      close: stock.close,
      percent_change: stock.percent_change,
      high: stock.high,
      low: stock.low,
    };
  });

  console.log(filteredStockData);
  const stockPrices = filteredStockData.map((stock) => {
    return (
      <div className="p-2">
        <h4 className="">
          {stock.name}, {stock.symbol}
        </h4>
        <p>
          {stock.close}, <span>{stock.percent_change}</span>
        </p>
        <p>
          {stock.low}, {stock.high}
        </p>
      </div>
    );
  });

  return (
    <div className="bg-black/80 rounded-2xl text-white">{stockPrices}</div>
  );
}
