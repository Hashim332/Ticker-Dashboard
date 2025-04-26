import { useEffect, useState } from "react";
import StockCard from "./StockCard";
import QuickAdd from "./QuickAdd";
import { Stock } from "../../utils";
import { useAuth } from "@clerk/clerk-react";
import SearchBar from "./SearchBar";

export default function StockDashes() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const popularStocks: string[] = ["GOOG", "AAPL", "MSFT", "NVDA", "AMZN"];
  const [alert, setAlert] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    let isMounted = true;

    async function getUserStocks() {
      try {
        const token = await getToken();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user-stocks`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const data = await res.json();
        if (isMounted) {
          console.log("successfully loaded users saved data: ", data);
          setStocks(data);
        }
      } catch (err) {
        console.error("Request failed:", err);
      }
    }

    getUserStocks();

    return () => {
      isMounted = false;
    };
  }, [getToken]);

  async function removeCard(ticker: string) {
    try {
      const token = await getToken();
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/delete-stock/${ticker}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Couldn't delete stock from database");
      }
      // const data = await res.json();
    } catch (err) {
      console.error(err);
    }

    setStocks((prevStocks) => {
      if (!prevStocks) return prevStocks;
      const newArray = prevStocks.filter((stock) => stock.ticker !== ticker);
      return newArray;
    });
  }

  async function addFromQuickAdd(ticker: string) {
    if (loading) return; // 👈 early guard
    setLoading(true);

    const isAlreadyAdded = stocks.some((stock) => stock.ticker === ticker);
    if (isAlreadyAdded) {
      setAlert("Stock already added!");
      setTimeout(() => setAlert(""), 3000);
      setLoading(false);
      return;
    } else {
      try {
        const token = await getToken();

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/validate-and-save`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ticker: ticker,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        setStocks((prevStocks) => [...prevStocks, data]);
      } catch (err) {
        console.error("frontend error occurred: ", err);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <div>
        <SearchBar setStocks={setStocks} stocks={stocks} />
      </div>
      <div className="p-4">
        <QuickAdd onClick={addFromQuickAdd} popularStocks={popularStocks} />
        <div className="flex flex-wrap justify-center gap-6">
          {stocks.map((stock) => (
            <StockCard
              key={stock.ticker}
              stock={stock}
              removeCard={removeCard}
            />
          ))}
          {loading && (
            <div className="w-full sm:w-auto rounded-xl shadow-md p-3 md:p-4 md:px-10 font-sans text-gray-800 flex flex-col justify-center border border-white animate-pulse bg-white">
              <div className="flex flex-row justify-between items-center mb-1 md:mb-4">
                <div className="h-5 md:h-6 bg-gray-300 rounded w-20 md:w-22"></div>
                <div className="w-6 h-6 md:w-7 md:h-7 bg-gray-300 rounded-full"></div>
              </div>
              <div className="space-y-0.5 md:space-y-1 text-xs md:text-sm">
                <div className="h-3.5 bg-gray-300 rounded w-24"></div>
                <div className="h-3.5 bg-gray-300 rounded w-24"></div>
                <div className="h-3.5 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          )}
        </div>
        {alert && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-300">
            {alert}
          </div>
        )}
      </div>
    </div>
  );
}
