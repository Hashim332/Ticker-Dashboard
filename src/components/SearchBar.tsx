import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function SearcBar() {
  const [inputValue, setInputValue] = useState("");
  const { getToken } = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value.toUpperCase());
  }

  async function sendTickers() {
    if (inputValue) {
      try {
        const token = await getToken();

        const res = await fetch("http://localhost:8000/api/validate-and-save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ticker: inputValue,
          }),
        });

        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error("frontend error occurred: ", err);
      }
      setInputValue("");
    }
  }

  return (
    <div className="flex items-center gap-2 w-full max-w-md mx-auto bg-white p-3 rounded-4xl font-medium">
      <input
        value={inputValue}
        onChange={handleChange}
        type="text"
        name="search"
        placeholder="Enter stock here..."
        className="flex-1 px-4 py-1 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        onClick={sendTickers}
        className="px-4 py-1 bg-black text-white rounded-2xl hover:bg-gray-700 transition-colors hover:cursor-pointer"
      >
        + Add
      </button>
    </div>
  );
}
