import { useEffect, useState } from "react";
import StockCard from "./StockCard";
import { roundDownTwoDP } from "../../utils";
import SearchBar from "./SearchBar";

export type StockInformation = {};

type FullApiResponse = {};

export default function StockInfo() {
  const [stockData, setStockData] = useState<FullApiResponse | null>(null);
  const apiKey = import.meta.env.VITE_ALPHAVANTAGE_API_KEY;

  useEffect(() => {
    async function getStockPrices() {
      try {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey==${apiKey}`
        );
        const data = await res.json();
        console.log(data);

        // filter data for only the key to object arrays
        const categories = Object.keys(data).filter((key) =>
          Array.isArray(data[key as keyof typeof data])
        );
        // rounding down %age change to 2 dp for cleanliness when displaying
        for (const category of categories) {
          data[category] = data[category].map((stock) => {
            const rawPercent = stock.change_percentage.replace("%", "");
            const numericPercent = Number(rawPercent);
            const rounded = roundDownTwoDP(numericPercent);

            return {
              ...stock,
              change_percentage: rounded,
            };
          });
        }
        setStockData(data);
      } catch (err) {
        console.error(`An error occurred: ${err}`);
      }
    }
    getStockPrices();
  }, []);

  if (!stockData) return null;

  // const requiredStockData:

  // const filteredStockData: StockInformation[] = symbols.map((symbol) => {
  //   const stock: StockInformation = stockData[symbol];
  //   return {
  //     symbol: stock.symbol,
  //     name: stock.name,
  //     close: stock.close,
  //     percent_change: stock.percent_change,
  //     high: stock.high,
  //     low: stock.low,
  //   };
  // });

  return (
    <div className="p-2">
      <SearchBar />
      <p></p>
    </div>
  );
}
