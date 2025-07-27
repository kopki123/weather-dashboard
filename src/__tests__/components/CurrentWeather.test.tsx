import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CurrentWeather from '../../components/CurrentWeather';
import { WeatherContext } from '../../contexts/WeatherContext';

const mockLocationData = {
  name: 'Taipei',
  country: 'Taiwan',
  latitude: 24,
  longitude: 121,
};

const mockCurrentWeather = {
  temperature: 25,
  windSpeed: 5,
  weatherCode: 1,
  humidity: 60,
  time: '2025-03-16T12:00:00Z',
};

describe('CurrentWeather 元件', () => {
  it('在攝氏模式下正確呈現', () => {
    const contextValue = {
      locale: 'zh' as const,
      city: '',
      temperatureUnit: 'C',
      favorites: [],
      setCity: jest.fn(),
      setLocale: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      toggleTemperatureUnit: jest.fn(),
    };

    render(
      <WeatherContext.Provider value={contextValue}>
        <CurrentWeather
          locationData={mockLocationData}
          currentWeather={mockCurrentWeather}
        />
      </WeatherContext.Provider>
    );

    // 檢查城市資訊與攝氏溫度（25°C）
    expect(screen.getByText(/Taipei, Taiwan/)).toBeInTheDocument();
    expect(screen.getByText(/25°C/)).toBeInTheDocument();
  });

  it('在華氏模式下正確呈現', () => {
    const contextValue = {
      locale: 'zh' as const,
      city: '',
      temperatureUnit: 'F' as const,
      favorites: [],
      setLocale: jest.fn(),
      setCity: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      toggleTemperatureUnit: jest.fn(),
    };

    render(
      <WeatherContext.Provider value={contextValue}>
        <CurrentWeather
          locationData={mockLocationData}
          currentWeather={mockCurrentWeather}
        />
      </WeatherContext.Provider>
    );

    // 檢查城市資訊與華氏溫度（77°F）
    expect(screen.getByText(/Taipei, Taiwan/)).toBeInTheDocument();
    expect(screen.getByText(/77°F/)).toBeInTheDocument();
  });
});
