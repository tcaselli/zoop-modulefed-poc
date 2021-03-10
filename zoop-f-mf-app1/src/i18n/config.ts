import i18n from 'i18next';
import ENcounter from './en/counter.json';
import ENheader from './en/header.json';
import DEcounter from './de/counter.json';
import DEheader from './de/header.json';
import { initReactI18next } from 'react-i18next';

// Namespaces allow to have multiple files for translations
export const resources = {
  en: {
    counter: ENcounter,
    header: ENheader,
  },
  de: {
    counter: DEcounter,
    header: DEheader,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'de',
  ns: ['header', 'counter'],
  resources,
});
