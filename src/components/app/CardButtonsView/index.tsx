import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { translate } from 'react-i18next';

import { BottomView as BottomViewProps } from '../../../redux/modules/app/profileCard';

import Icon from '../../common/Icon';

/**
 * Types
 */

export type Props = {
  changeView: (view: BottomViewProps) => void
  logout: () => void,
  t: Function
};

/**
 * Component
 */

const CardButtonsView: SFC<Props> = (props) => {
  const { t, changeView, logout } = props;

  return (
    <div styleName="control-buttons">
      <button
        type="button"
        onClick={() => changeView('profile-form')}>
        <Icon name="pencil" styleName="icon"/> {t('editProfile')}
      </button>

      <button
        type="button"
        onClick={() => changeView('password-form')}>
        <Icon name="lock" styleName="icon"/> {t('changePassword')}
      </button>

      <button
        type="button"
        onClick={() => logout()}>
        <Icon name="logout" styleName="icon"/> {t('signOut')}
      </button>
    </div>
  );
};

/**
 * Export
 */

const StyledComponent = CSSModules(CardButtonsView, require('./styles.css'));
const TranslatedComponent = translate('app')(StyledComponent);

export default TranslatedComponent;
