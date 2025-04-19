import { useEffect, useState } from "react";
import StockCard from "./StockCard";
import QuickAdd from "./QuickAdd";
import { Stock } from "../../utils";
import { useAuth } from "@clerk/clerk-react";
import SearchBar from "./SearchBar";

// TODO:
// get ride of the alphavantage api, only using for most traded. instead just reccommend 5 popular stick
// do type validation on the backend if needed so logic moved to the backend
// button click on quick add should write to db
// render stock from users input/interaction

export default function StockDashes() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const popularStocks = ["GOOG", "AAPL", "MSFT", "NVDA", "AMZN"];
  const [alert, setAlert] = useState("");
  const { getToken } = useAuth();

  useEffect(() => {
    let isMounted = true;

    async function getUserStocks() {
      try {
        const token = await getToken();
        const res = await fetch("http://localhost:8000/api/user-stocks", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const data = await res.json();
        if (isMounted) {
          console.log("successfully loaded users saved data: ", data);
          setStocks(data); // Replace instead of append
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
        throw new Error("you on some bullshit son 😂");
      }
      const data = await res.json();
      console.log("delete button delete from db (i think) ", data);
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
    const isAlreadyAdded = stocks.some((stock) => stock.ticker === ticker);
    if (isAlreadyAdded) {
      console.log("You've already added this one!");
      setAlert("Stock already added!");
      setTimeout(() => setAlert(""), 3000);
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
      }
      console.log("quick added");
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
