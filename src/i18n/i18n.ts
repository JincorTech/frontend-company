import * as i18n from 'i18next';

const ru = {
  app: require('../locales/ru/app.json'),
  auth: require('../locales/ru/auth.json'),
  common: require('../locales/ru/common.json'),
  employees: require('../locales/ru/employees.json'),
  form: require('../locales/ru/form.json'),
  profile: require('../locales/ru/profile.json'),
  search: require('../locales/ru/search.json')
};

const en = {
  app: require('../locales/en/app.json'),
  auth: require('../locales/en/auth.json'),
  common: require('../locales/en/common.json'),
  employees: require('../locales/en/employees.json'),
  form: require('../locales/en/form.json'),
  profile: require('../locales/en/profile.json'),
  search: require('../locales/en/search.json')
};

export const config = {
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'ru'],
  debug: process.env.NODE_ENV === 'development',
  react: {
    wait: true,
    nsMode: 'default'
  },
  resources: {
    en: {
      app: en.app,
      auth: en.auth,
      common: en.common,
      employees: en.employees,
      form: en.form,
      profile: en.profile,
      search: en.search
    },
    ru: {
      app: ru.app,
      auth: ru.auth,
      common: ru.common,
      employees: ru.employees,
      form: ru.form,
      profile: ru.profile,
      search: ru.search
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
  .init(config);

export default instance;
