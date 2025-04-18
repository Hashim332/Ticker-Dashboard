import { useEffect, useState, ReactElement } from "react";
import StockCard from "./StockCard";
import { roundDownTwoDP } from "../../utils";
import QuickAdd from "./QuickAdd";
import {
  AlphaVantageResponse,
  UnifiedStock,
  alphaVantageToUnified,
  finnhubToUnified,
} from "../../utils";
// TODO:
// figure out wtf to do with the apiresposnetounified functions
// stop displaying stocks, move that functionality to quick add
// render stock when user clicks add from the existing data i.e work with the object that comes back and render a stock onclick?

export default function StockDashes() {
  const [stockData, setStockData] = useState<AlphaVantageResponse | null>(null);
  const [stockCards, setStockCards] = useState<ReactElement[]>([]);
  const [top10Traded, setTop10Traded] = useState<UnifiedStock[]>();

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
        const data = await res.json(); //

        // filter data for only the key to object arrays
        const categories = Object.keys(data).filter((key) =>
          Array.isArray(data[key as keyof typeof data])
        );

        // data cleaning should happen in stockCard
        // rounding down %age change to 2 dp for cleanliness when displaying
        for (const category of categories) {
          data[category] = data[category].map((stock: UnifiedStock) => {
            // Handle the change_percentage as a string
            const rawPercent = stock.changePercentage;
            const numericPercent = Number(rawPercent);
            const rounded = roundDownTwoDP(numericPercent);
            return {
              ...stock,
              change_percentage: rounded.toString(), // Keep it as a string for consistency
              // Convert other string properties to numbers if needed for further processing
              price: Number(stock.currentPrice),
              change_amount: Number(stock.changeAmount),
            };
          });
        }
        setStockData(data);
        setTop10Traded(data.most_actively_traded.slice(0, 5));
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

  function addFromQuickAdd() {
    setStockCards(defaultStocks.slice(0, 9));
    console.log("quick added");
  }

  return (
    <div className="p-4">
      <QuickAdd onClick={addFromQuickAdd} top10Traded={top10Traded} />
      <div className="flex flex-wrap justify-center gap-6">{stockCards}</div>
    </div>
  );
}
