import * as React from 'react';
import { PureComponent, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';
import { InjectedCSSModuleProps } from 'react-css-modules';
import { translate } from 'react-i18next';

import { Link } from 'react-router';
import { routes } from '../../../routes';
import Icon from '../../common/Icon';

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & InjectedCSSModuleProps & {
  open?: boolean
  onClose: () => void,
  t: any,
  i18nLoadedAt?: any,
  i18n?: any
};

/**
 * Component
 */
class Sidebar extends PureComponent<Props, {}> {
  private aside: HTMLElement;

  constructor(props) {
    super(props);

    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  public componentWillReceiveProps(nextProps: Props): void {
    const { open } = this.props;

    if (!open && nextProps.open) {
      document.addEventListener('click', this.handleOutsideClick);
    }

    if (open && !nextProps.open) {
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }

  private handleOutsideClick(e: any): void {
    if (!this.aside.contains(e.target)) {
      this.props.onClose();
    }
  }

  public render(): JSX.Element {
    const { t, open, onClose, styles, i18nLoadedAt, i18n, ...divProps } = this.props;
    const { link, active } = styles;

    return (
      <aside
        styleName={open ? 'sidebar-open' : 'sidebar-close'}
        ref={(aside) => this.aside = aside}
        {...divProps}>

        <Icon styleName="close-icon" name="close" onClick={onClose}/>

        <nav>
          <a className={link} href="/msg">{t('messanger')}</a>
          <Link className={link} activeClassName={active} to={routes.profile}>{t('myCompany')}</Link>
          {/*<Link className={link} activeClassName={active} to="/app/favorites">Избранное</Link>*/}
          <Link className={link} activeClassName={active} to={routes.search}>{t('search')}</Link>
        </nav>
      </aside>
    );
  }
}

export default translate('app')(CSSModules(Sidebar, require('./styles.css')));
