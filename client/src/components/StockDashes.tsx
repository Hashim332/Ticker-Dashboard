import { useEffect, useState } from "react";
import StockCard from "./StockCard";
import QuickAdd from "./QuickAdd";
import { Stock } from "../../frontend-utils";
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
        console.log("hey were here");
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
        `http://localhost:8000/api/delete-stock/${ticker}`,
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

        const res = await fetch("http://localhost:8000/api/validate-and-save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ticker: ticker,
          }),
        });
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
        <SearchBar setStocks={setStocks} />
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
