import React, { useContext } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { WeatherContext } from '../contexts/WeatherContext';

interface FavoriteCitiesProps {
  onSelectCity: (city: string) => void;
}

const FavoriteCities: React.FC<FavoriteCitiesProps> = ({
  onSelectCity,
}) => {
  const weatherCtx = useContext(WeatherContext);

  if (!weatherCtx) {
    throw new Error('WeatherContext must be used within a WeatherProvider');
  }

  const {
    favorites,
    removeFavorite
  } = weatherCtx;

  return (
    <div className="my-4 p-4 shadow-md rounded-md bg-gray-100">
      <h2 className="font-bold mb-2">常用城市</h2>

      {favorites.length === 0 ? (
        <p className="text-sm text-gray-500">尚未加入收藏</p>
      ) : (
        <ul>
          {favorites.map((city) => (
            <li
              key={city}
              className="mt-2 flex justify-between items-center"
            >
              <button
                className="text-blue-500 hover:underline hover:cursor-pointer"
                onClick={() => onSelectCity(city)}
              >
                {city}
              </button>

              <button
                className="ml-2 text-red-500 hover:scale-105 hover:cursor-pointer"
                onClick={() => removeFavorite(city)}
              >
                <FaRegTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteCities;
