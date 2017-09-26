import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { translate } from 'react-i18next';
import { getBackgroundColor, getInitials } from '../../../utils/colorFunction';

import { Self as SelfProps } from '../../../redux/modules/employees/employees';

export type Props = ComponentProps & DispatchProps;

export type ComponentProps = {
  employee: SelfProps,
  t: any
};

export type DispatchProps = {
  onOpenProfile: () => void
};

const Self: SFC<Props> = (props) => {
  const { t, employee, onOpenProfile } = props;
  const { id, profile, contacts } = employee;
  const backgroundColor = getBackgroundColor(id);
  const initials = getInitials(profile.name);

  return (
    <div styleName="employee" onClick={() => onOpenProfile()}>
      {
        profile.avatar
          ? <img styleName="avatar" src={profile.avatar}/>
          : <div styleName="avatar-empty" style={backgroundColor}>{initials}</div>
      }

      <div styleName="info">
        <div styleName="full-name">{profile.name} {profile.role === 'company-admin' && <span styleName="label">{t('administrator')}</span>}</div>
        <div styleName="email-n-position">
          <div styleName="email-slide">
            <div>{profile.position}</div>
            <div>{contacts.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default translate('employees')(CSSModules(Self, require('./styles.css')));
