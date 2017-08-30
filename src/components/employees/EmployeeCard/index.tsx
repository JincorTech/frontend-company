import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

import { Props as PopupProps } from '../../common/Popup';
import { EmployeeCard as EmployeeCardState } from '../../../redux/modules/employees/employees';
import { UserCompany as UserCompanyProps } from '../../../redux/modules/app/appLayout';

import Popup from '../../common/Popup';
import CardAvatar from '../../app/CardAvatar';

export type Props =
  JSX.IntrinsicAttributes &
  JSX.IntrinsicClassAttributes<any> &
  PopupProps &
  EmployeeCardProps &
  EmployeeCardState;

export type EmployeeCardProps = {
  company: UserCompanyProps
};

const EmployeeCard: SFC<Props> = ({ employee, company, ...popupProps }) => {
  const {
    id,
    profile
  } = employee;

  const {
    avatar,
    name,
    firstName,
    lastName,
    position
  } = profile;

  const {
    legalName,
    profile: { picture }
  } = company;

  return (
    <Popup styleName="employee-card" {...popupProps}>
      <CardAvatar
        type="employee"
        avatar={avatar}
        id={id}
        name={name}
        firstName={firstName}
        lastName={lastName}
        position={position}
        companyName={legalName}
        companyLogo={picture}>
        <div styleName="buttons">
          <button type="button">Сообщение</button>
          <button type="button">Добавить в контакты</button>
          <button type="button">Заблокировать</button>
        </div>
      </CardAvatar>
    </Popup>
  );
};

export default CSSModules(EmployeeCard, require('./styles.css'));
