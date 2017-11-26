import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { format } from 'date-fns';
import { translate } from 'react-i18next';

import { InvitedEmployee as InvitedEmployeeProps } from '../../../redux/modules/employees/employees';

export type Props = ComponentProps;

export type ComponentProps = {
  employee: InvitedEmployeeProps,
  t: Function
};

const InvitedEmployee: SFC<Props> = ({ t, employee }) => {
  const { contacts, meta } = employee;

  return (
    <div styleName="employee">
      <div styleName="avatar">
        <div styleName="invited-image"/>
      </div>

      <div styleName="info">
        <div styleName="email">{contacts.email}</div>
      </div>

      <div styleName="status">{t('invited')} {format(meta.invitedAt, 'DD.MM.YYYY')}</div>
    </div>
  );
};

const StyledComponent = CSSModules(InvitedEmployee, require('./styles.css'));
const TranslatedComponent = translate('employees')(StyledComponent);

export default TranslatedComponent;
