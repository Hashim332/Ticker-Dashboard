import { StockInformation } from "./Dashboard";

type StockCardProps = {
  stock: StockInformation;
};

export default function StockCard({ stock }: StockCardProps) {
  console.log("this is ", stock);
  return (
    <div key={stock.symbol} className="p-3 rounded-lg bg-white/5">
      <h4 className="text-sm font-semibold text-white">
        {stock.name}, <span className="text-gray-300">{stock.symbol}</span>
      </h4>
      <p className="text-lg font-bold mt-1">
        ${parseFloat(stock.close).toFixed(2)}
        <span
          className={`ml-2 text-sm ${
            parseFloat(stock.percent_change) >= 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {parseFloat(stock.percent_change).toFixed(2)}%
        </span>
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Range: {parseFloat(stock.low).toFixed(2)} -{" "}
        {parseFloat(stock.high).toFixed(2)}
      </p>
    </div>
  );
}
