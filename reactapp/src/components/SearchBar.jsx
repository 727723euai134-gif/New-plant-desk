import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search plants...", className = "" }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <div className={`relative flex items-center transition-all duration-300 ${
      isFocused ? 'w-80' : 'w-64'
    } ${className}`}>
      <div className="absolute left-3 z-10">
        <svg className={`w-4 h-4 transition-colors duration-200 ${
          isFocused ? 'text-green-500' : 'text-gray-400'
        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 focus:bg-white ${
          isFocused ? 'shadow-md' : 'hover:bg-gray-100'
        }`}
      />
    </div>
  );
};

export default SearchBar;