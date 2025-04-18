export default function QuickAdd() {
  function quickAdd() {
    console.log("quick added PLTR");
  }
  return (
    <div className="w-1/2 my-4 py-4 bg-white rounded-md shadow-sm m-auto text-center">
      <h1 className="pb-4 text-xl">Quick add</h1>
      <div className="flex flex-row justify-evenly">
        <button
          onClick={quickAdd}
          className="px-10 py-4 rounded-md border border-gray-300 bg-white shadow-sm hover:shadow-md
                  cursor-pointer transition-all duration-200
                 hover:border-blue-400 hover:text-blue-600 text-gray-600 font-semibold text-sm"
        >
          + PLTR
        </button>
        <button
          onClick={quickAdd}
          className="px-10 py-4 rounded-md border border-gray-300 bg-white shadow-sm hover:shadow-md
                  cursor-pointer transition-all duration-200
                 hover:border-blue-400 hover:text-blue-600 text-gray-600 font-semibold text-sm"
        >
          + GOOG
        </button>
        <button
          onClick={quickAdd}
          className="px-10 py-4 rounded-md border border-gray-300 bg-white shadow-sm hover:shadow-md
                  cursor-pointer transition-all duration-200
                 hover:border-blue-400 hover:text-blue-600 text-gray-600 font-semibold text-sm"
        >
          + MSFT
        </button>
      </div>
    </div>
  );
}
