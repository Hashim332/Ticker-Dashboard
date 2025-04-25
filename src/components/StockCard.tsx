import { Stock } from "../../utils";

type StockCardProps = {
  stock: Stock;
  removeCard: (ticker: string) => void;
};

export default function StockCard({ stock, removeCard }: StockCardProps) {
  const currentPrice = stock.c;
  const changeAmount = stock.d;
  const changePercentage = stock.dp;
  const isPositive = changeAmount > 0;
  const emoji = isPositive ? "📈" : "📉";

  return (
    <div
      className={`
        w-full           /* take 100% width on small screens */
        rounded-xl shadow-md p-3 md:p-6 md:px-10 
        font-sans text-gray-800 flex flex-col justify-center
        ${
          isPositive
            ? "bg-gradient-to-br from-green-50 via-white to-green-100"
            : "bg-gradient-to-br from-red-50 via-white to-red-100"
        }
        border border-white
      `}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2 flex items-center gap-1 md:gap-2">
          {emoji} {stock.ticker}
        </div>
        <button
          onClick={() => removeCard(stock.ticker)}
          className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full border border-gray-500 text-gray-500 hover:bg-red-500 hover:text-white transition-colors duration-200 hover:cursor-pointer text-xs md:text-sm"
        >
          x
        </button>
      </div>
      <div className="space-y-0.5 md:space-y-1 text-xs md:text-sm">
        <div>
          <span className="font-medium text-gray-600">Price:</span> $
          {currentPrice}
        </div>
        <div>
          <span className="font-medium text-gray-600">Change:</span>{" "}
          <span className={isPositive ? "text-green-600" : "text-red-600"}>
            ${Number(changeAmount).toFixed(2)}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Change %:</span>{" "}
          <span className={isPositive ? "text-green-600" : "text-red-600"}>
            {changePercentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
