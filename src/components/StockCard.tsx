import { Stock } from "./Dashboard";

type StockCardProps = {
  stock: Stock;
};

export default function StockCard({ stock }: StockCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 w-full max-w-sm mx-auto">
      <div className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {stock.ticker}
      </div>
      <div className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <span className="font-medium">Price:</span> ${stock.price.toFixed(2)}
        </div>
        <div>
          <span className="font-medium">Change:</span> $
          {stock.change_amount.toFixed(2)}
        </div>
        <div>
          <span className="font-medium">Change %:</span>{" "}
          {stock.change_percentage.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}
