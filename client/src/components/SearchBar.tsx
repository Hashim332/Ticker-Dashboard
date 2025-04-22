import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Stock } from "../../frontend-utils";

type SearchBarProps = {
  setStocks: React.Dispatch<React.SetStateAction<Stock[]>>;
};

export default function SearcBar({ setStocks }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const { getToken } = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value.toUpperCase());
  }

  async function sendTickers() {
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
        console.log(data);
        setStocks((prevStocks) => [...prevStocks, data]);
      } catch (err) {
        console.error("frontend error occurred: ", err);
      }
    }
    setInputValue("");
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto bg-white p-3 rounded-4xl font-medium">
      <input
        value={inputValue}
        onChange={handleChange}
        type="text"
        name="search"
        placeholder="Enter stock here..."
        className="w-full sm:flex-1 px-4 py-1 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        onClick={sendTickers}
        className="w-full sm:w-auto px-4 py-1 bg-black text-white rounded-2xl hover:bg-gray-700 transition-colors hover:cursor-pointer mt-2 sm:mt-0 sm:ml-0" // sm:ml-0 to potentially override the parent gap, using mt/sm:mt for spacing
      >
        + Add
      </button>
    </div>
  );
}
