import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Stock } from "../../utils";

type SearchBarProps = {
  setStocks: React.Dispatch<React.SetStateAction<Stock[]>>;
  stocks: Stock[];
};

const REMOVE_DISALLOWED_REGEX = /[^a-zA-Z]/g;

export default function SearcBar({ setStocks, stocks }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const { getToken } = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const containsDisallowed = REMOVE_DISALLOWED_REGEX.test(e.target.value);
    if (containsDisallowed) {
      console.log("this input isnt valid!");
      setAlert("Tickers only have letters!");
      setTimeout(() => setAlert(""), 3000);
    }

    const newValue = e.target.value;
    const cleanedValue = newValue.replace(REMOVE_DISALLOWED_REGEX, "");
    setInputValue(cleanedValue.toUpperCase());
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      sendTickers();
    }
  }

  async function sendTickers() {
    if (inputValue === "") {
      setAlert("Please enter a valid stock ticker!");
      setTimeout(() => setAlert(""), 3000);
      setInputValue("");
      return;
    }

    const isAlreadyAdded = stocks.some((stock) => stock.ticker === inputValue);
    if (isAlreadyAdded) {
      setAlert("That stock already exists!");
      setTimeout(() => setAlert(""), 3000);
      setInputValue("");
      return;
    }

    if (inputValue) {
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
              ticker: inputValue,
            }),
          }
        );
        const data = await res.json();
        if (data.error) {
          setAlert("Please enter a valid stock ticker");
          setTimeout(() => setAlert(""), 3000);
          return;
        }
        setStocks((prevStocks) => [...prevStocks, data]);
      } catch (err) {
        console.error("frontend error occurred: ", err);
      }
    }
    setInputValue("");
  }

  return (
    <div className="flex flex-col max-w-md mx-auto bg-white p-3 rounded-4xl font-medium">
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <input
          maxLength={4}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          name="search"
          placeholder="Enter stock here..."
          className="w-full sm:flex-1 px-4 py-1 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={sendTickers}
          className="w-full sm:w-auto px-4 py-1 bg-black text-white rounded-2xl hover:bg-gray-700 transition-colors hover:cursor-pointer mt-2 sm:mt-0"
        >
          + Add
        </button>
      </div>
      {alert && (
        <div className="mt-2 text-center text-red-500 text-sm">{alert}</div>
      )}
    </div>
  );
}
