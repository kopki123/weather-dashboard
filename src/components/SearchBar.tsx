import React, { FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  onSearch: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ city, setCity, onSearch }) => {
  return (
    <form
      className="mb-4 flex"
      onSubmit={onSearch}
    >
      <input
        type="text"
        value={city}
        placeholder="請輸入城市名稱"
        className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        type="submit"
        className="bg-gray-300 text-white p-3 rounded-r-lg"
        disabled={!city}
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;