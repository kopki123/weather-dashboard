import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const SUPPORT_LOCALES: {
  value: string;
  label: string;
}[] = [];

const locales = import.meta.glob('./locales/*.json', { eager: true }) as { [x: string]: { default: { [key: string]: string } } };
const resources: { [x: string]: { translation: { [key: string]: string } } } = {};

for (const path in locales) {
  const locale = path.replace(/(\.\/locales\/|\.json)/g, '');

  resources[locale] = { translation: locales[path].default };

  SUPPORT_LOCALES.push({
    value: locale,
    label: resources[locale].translation.language,
  });
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh-TW',
    fallbackLng: 'zh-TW',
    interpolation: { escapeValue: false }
  });

export default i18n;
