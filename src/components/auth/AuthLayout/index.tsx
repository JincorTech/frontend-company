import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { routes } from '../../../routes';

import Link from '../../common/Link';
import Logo from '../../common/Logo';
import Alert from '../../../containers/common/Alert';

const Header: SFC<{}> = ({ children }) => {
  return (
    <div>
      <Alert />
      <header styleName="header">
        <div styleName="container">
          <Logo to={routes.base}/>

          <nav styleName="pull-right">
            <Link styleName="enter-link" to={routes.signIn}>Войти</Link>
            <Link to={routes.signUp} withBorder>Новая компания</Link>
          </nav>
        </div>
      </header>

      <section>
        <div styleName="container">
          {children}
        </div>
      </section>
    </div>
  );
};

export default CSSModules(Header, require('./styles.css'));
