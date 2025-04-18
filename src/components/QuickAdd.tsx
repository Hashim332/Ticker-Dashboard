import { UnifiedStock } from "../../utils";

type QuickAddProps = {
  top10Traded?: UnifiedStock[];
  onClick: () => void;
};

export default function QuickAdd({ top10Traded, onClick }: QuickAddProps) {
  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl my-4 py-6 px-4 bg-white rounded-md shadow-sm mx-auto text-center">
      <h1 className="pb-4 text-lg sm:text-xl md:text-2xl font-semibold">
        Quick add
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {top10Traded &&
          top10Traded.map((stock) => (
            <button
              key={stock.ticker}
              onClick={onClick}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-md border border-gray-300 bg-white shadow-sm hover:shadow-md
                    cursor-pointer transition-all duration-200
                    hover:border-blue-400 hover:text-blue-600 text-gray-600 font-semibold text-sm sm:text-base"
            >
              + {stock.ticker}
            </button>
          ))}
      </div>
    </div>
  );
}
