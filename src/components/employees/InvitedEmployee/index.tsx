import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { format } from 'date-fns';

import { InvitedEmployee as InvitedEmployeeProps } from '../../../redux/modules/employees/employees';

export type Props = ComponentProps;

export type ComponentProps = {
  employee: InvitedEmployeeProps
};

const InvitedEmployee: SFC<Props> = ({ employee }) => {
  const { contacts, meta } = employee;

  return (
    <div styleName="employee">
      <div styleName="avatar">
        <div styleName="invited-image"/>
      </div>

      <div styleName="info">
        <div styleName="email">{contacts.email}</div>
      </div>

      <div styleName="status">Приглашен {format(meta.invitedAt, 'DD.MM.YYYY')}</div>
    </div>
  );
};

export default CSSModules(InvitedEmployee, require('./styles.css'));
