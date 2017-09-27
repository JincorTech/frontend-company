import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';
import { translate } from 'react-i18next';
import { routes } from '../../../routes';

import Link from '../../common/Link';
import Logo from '../../common/Logo';
import Alert from '../../../containers/common/Alert';

export type Props = HTMLProps<HTMLSpanElement> & {
  children: React.ReactNode,
  t: any
};

const Header: SFC<Props> = ({ t, children }) => {
  return (
    <div>
      <Alert />
      <header styleName="header">
        <div styleName="container">
          <Logo to={routes.base}/>

          <nav styleName="pull-right">
            <Link styleName="enter-link" to={routes.signIn}>{t('enter')}</Link>
            <Link to={routes.signUp} withBorder>{t('newCompany')}</Link>
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

export default translate('auth')(CSSModules(Header, require('./styles.css')));
