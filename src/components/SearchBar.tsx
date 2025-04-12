import React from "react";

const SearchBar: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your functionality here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full max-w-md mx-auto bg-white p-3 rounded-4xl font-medium"
    >
      <input
        type="text"
        name="search"
        placeholder="Enter stock here..."
        className="flex-1 px-4 py-1 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        className="px-4 py-1 bg-black text-white rounded-2xl hover:bg-gray-800 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
