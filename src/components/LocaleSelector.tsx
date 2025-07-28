import React, { useContext } from 'react';
import Select from './Select';
import { SUPPORT_LOCALES } from '../i18n/i18n';
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

  return (
    <Select
      className={className}
      value={locale}
      options={SUPPORT_LOCALES}
      onChange={(value) => setLocale(value as Locale)}
    />
  );
};

export default LocaleSelector;