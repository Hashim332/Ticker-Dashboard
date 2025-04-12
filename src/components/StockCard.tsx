import { Stock } from "./StockDashes";

type StockCardProps = {
  stock: Stock;
};
export default function StockCard({ stock }: StockCardProps) {
  const price = Number(stock.price);
  const changeAmount = Number(stock.change_amount);
  const changePercentage = Number(stock.change_percentage);

  const isPositive = changeAmount > 0;
  const emoji = isPositive ? "📈" : "📉";

  return (
    <div
      className={`rounded-xl shadow-md p-4 w-56 font-sans text-gray-800 flex flex-col justify-center
        ${
          isPositive
            ? "bg-gradient-to-br from-green-50 via-white to-green-100"
            : "bg-gradient-to-br from-red-50 via-white to-red-100"
        }
       border border-white
`}
    >
      <div className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
        {emoji} {stock.ticker}
      </div>
      <div className="space-y-1 text-sm">
        <div>
          <span className="font-medium text-gray-600">Price:</span> $
          {price.toFixed(2)}
        </div>
        <div>
          <span className="font-medium text-gray-600">Change:</span>{" "}
          <span className={isPositive ? "text-green-600" : "text-red-600"}>
            ${changeAmount.toFixed(2)}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Change %:</span>{" "}
          <span className={isPositive ? "text-green-600" : "text-red-600"}>
            {changePercentage.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
