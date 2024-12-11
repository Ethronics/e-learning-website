// SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch, onFilterChange }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between mb-6">
      <div className="flex items-center mb-4 md:mb-0">
        <input
          type="text"
          placeholder="Search by keyword, curriculum, or instructor"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      
    </div>
  );
};

export default SearchBar;
