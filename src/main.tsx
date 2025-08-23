import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n/i18n.ts';
import './index.css';
import App from './App.tsx';
import { WeatherProvider } from './contexts/WeatherContext.tsx';
import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_GA_ID);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </StrictMode>,
);
