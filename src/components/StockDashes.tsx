import { useEffect, useState } from "react";
import StockCard from "./StockCard";
import { roundDownTwoDP } from "../../utils";
import QuickAdd from "./QuickAdd";

// API response keeps values as strings (e.g., "12%")
export type Stock = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
};

type ApiResponse = {
  top_gainers: Stock[];
  top_losers: Stock[];
  most_actively_traded: Stock[];
};

export default function StockDashes() {
  const [stockData, setStockData] = useState<ApiResponse | null>(null);

  stockData && console.log("stock data:", stockData);

  function removeCard(ticker: string) {
    setStockData((prevStockData) => {
      if (!prevStockData) return prevStockData;

      return {
        ...prevStockData,
        most_actively_traded: prevStockData.most_actively_traded.filter(
          (stock) => stock.ticker !== ticker
        ),
      };
    });
  }

  useEffect(() => {
    async function getStockPrices() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/stocks`);
        const data = await res.json();

        // filter data for only the key to object arrays
        const categories = Object.keys(data).filter((key) =>
          Array.isArray(data[key as keyof typeof data])
        );

        // rounding down %age change to 2 dp for cleanliness when displaying
        for (const category of categories) {
          data[category] = data[category].map((stock: Stock) => {
            // Handle the change_percentage as a string
            const rawPercent = stock.change_percentage.replace("%", "");
            const numericPercent = Number(rawPercent);
            const rounded = roundDownTwoDP(numericPercent);

            return {
              ...stock,
              change_percentage: rounded.toString(), // Keep it as a string for consistency
              // Convert other string properties to numbers if needed for further processing
              price: Number(stock.price),
              change_amount: Number(stock.change_amount),
              volume: Number(stock.volume),
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

  if (!stockData || Object.keys(stockData).length === 0) {
    return <div>Loading...</div>;
  }

  const defaultStocks =
    stockData &&
    stockData.most_actively_traded.map((stock, index) => {
      return <StockCard stock={stock} key={index} removeCard={removeCard} />;
    });

  return (
    <div className="p-4">
      <QuickAdd />
      <div className="flex flex-wrap justify-center gap-6">
        {defaultStocks.slice(0, 9)}
      </div>
    </div>
  );
}
