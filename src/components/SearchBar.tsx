import React, { FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  onSearch: (e: FormEvent<HTMLFormElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ city, setCity, onSearch }) => {
  const { t } = useTranslation();

  return (
    <form
      className='mb-4 flex'
      onSubmit={onSearch}
    >
      <input
        type='text'
        value={city}
        placeholder={t('search_placeholder')}
        className='flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none'
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        type='submit'
        className='bg-gray-300 text-white p-3 rounded-r-lg'
        disabled={!city}
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;