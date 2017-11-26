import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import store from './redux/store';
import routes from './routes';
import i18n from './i18n/i18n';

import './assets/normalize.css';
import './assets/fonts/OpenSans/stylesheet.css';
import './assets/main.css';

const history = syncHistoryWithStore(browserHistory, store);

ReactDom.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  </I18nextProvider>
  ,
  document.getElementById('app')
);
