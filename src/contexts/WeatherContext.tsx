import React, { createContext, useState, useEffect, ReactNode } from 'react';

export type Locale = ('en' | 'zh');

export interface WeatherContextType {
  locale: Locale;
  city: string;
  temperatureUnit: string;
  favorites: string[];
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
  toggleTemperatureUnit: () => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

interface WeatherProviderProps {
  children: ReactNode;
}

const storedFavorites = JSON.parse(localStorage.getItem('favoriteCities')!) || [];
const storedLocale = JSON.parse(localStorage.getItem('locale')!) || 'zh';

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [city, setCity] = useState<string>('');
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');
  const [favorites, setFavorites] = useState<string[]>(storedFavorites);
  const [locale, setLocale] = useState<Locale>(storedLocale);

  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('locale', JSON.stringify(locale));
  }, [locale]);

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prev) => prev === 'C' ? 'F' : 'C');
  };

  const addFavorite = (city: string) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (city: string) => {
    setFavorites(favorites.filter((fav) => fav !== city));
  };

  return (
    <WeatherContext.Provider
      value={{
        locale,
        city,
        temperatureUnit,
        favorites,
        setLocale,
        setCity,
        addFavorite,
        removeFavorite,
        toggleTemperatureUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
