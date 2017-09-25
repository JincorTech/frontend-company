import * as i18n from 'i18next';
import * as XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

let ru = require('../locales/ru/common.json');
let en = require('../locales/en/common.json');

export const config = {
  lng: 'ru',
  fallbackLng: 'en',
  supportedLngs: ['en', 'ru'],
  debug: process.env.NODE_ENV === 'development',
  react: {
    wait: true,
    nsMode: 'default'
  },
  resources: {
    en: {
      common: en,
    },
    ru: {
      common: ru,
    }
  },
  ns: ['common'],
  defaultNS: 'common',
  detection: {
    order: ['querystring', 'localStorage'],
    lookupQuerystring: 'lang',
    lookupLocalStorage: 'i18nextLng',
    caches: ['localStorage']
  }
};

const instance = i18n
  .use(XHR)
  // .use(LanguageDetector)
  .init(config);

export default instance;
