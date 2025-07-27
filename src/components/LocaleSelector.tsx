import React, { useContext } from 'react';
import Select from './Select';
import i18n, { SUPPORT_LOCALES } from '../i18n/i18n';
import { Locale, WeatherContext, WeatherContextType } from '../contexts/WeatherContext';

interface LocaleSelectorProps {
  className?: string;
}

const LocaleSelector: React.FC<LocaleSelectorProps> = ({
  className,
}) => {
  const weatherCtx = useContext(WeatherContext);

  if (!weatherCtx) {
    throw new Error('WeatherContext must be used within a WeatherProvider');
  }

  const {
    locale,
    setLocale,
  } = weatherCtx as WeatherContextType;

  const handleChange = (value: string) => {
    setLocale(value as Locale);
    i18n.changeLanguage(value);
  };

  return (
    <Select
      className={className}
      value={locale}
      options={SUPPORT_LOCALES}
      onChange={handleChange}
    />
  );
};

export default LocaleSelector;