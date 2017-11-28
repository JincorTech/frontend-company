import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';
import { translate } from 'react-i18next';

import { Props as PopupProps } from '../../common/Popup';
import { EmployeeCard as EmployeeCardState } from '../../../redux/modules/employees/employees';
import { UserCompany as UserCompanyProps } from '../../../redux/modules/app/appLayout';

import Popup from '../../common/Popup';
import CardAvatar from '../../app/CardAvatar';

import { clearMatrixId } from '../../../helpers/matrix';

export type Props =
  JSX.IntrinsicAttributes &
  JSX.IntrinsicClassAttributes<any> &
  PopupProps &
  EmployeeCardProps &
  EmployeeCardState;

export type EmployeeCardProps = {
  company: UserCompanyProps,
  t: Function
};

const EmployeeCard: SFC<Props> = ({ t, employee, company, ...popupProps }) => {
  const {
    id,
    matrixId,
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
          <a href={`/msg/room/${clearMatrixId(matrixId)}`}>{t('message')}</a>
        </div>
      </CardAvatar>
    </Popup>
  );
};

const StyledComponent = CSSModules(EmployeeCard, require('./styles.css'));
const TranslatedComponent = translate('employees')(StyledComponent);

export default TranslatedComponent;
