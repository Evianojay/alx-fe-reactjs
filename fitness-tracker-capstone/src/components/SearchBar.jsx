import React, { useState } from "react";

const SearchBar = ({ onSearch, placeholder = "Search...", className = "" }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-20 bg-black/40 border border-cyan-500/30 rounded-lg text-cyan-100 placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none backdrop-blur-sm"
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-400 hover:bg-cyan-500/30 transition-colors"
        >
          🔍
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
