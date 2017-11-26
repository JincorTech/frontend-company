import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import {
  restorePassword,
  confirmEmail,
  setNewPassword,
  selectCompany,
  Step
} from '../../../redux/modules/auth/restorePassword';
import { companySelector } from '../../../selectors/auth/signIn';

import RequestPasswordForm from '../../../components/auth/RequestPasswordForm';
import ConfirmPasswordForm from '../../../components/auth/ConfirmPasswordForm';
import NewPasswordForm from '../../../components/auth/NewPasswordForm';
import CompanyList, { Company } from '../../../components/auth/CompanyList';

/**
 * Types
 */
export type Props = ComponentProps & StateProps & DispatchProps;

export type ComponentProps = HTMLProps<HTMLDivElement>;

export type StateProps = {
  step: Step
  spinner: boolean
  verificationId: string
  companyId: string
  companies: Company[]
};

export type DispatchProps = {
  selectCompany: (companyId: string) => void
};

/**
 * Component
 */
const RestorePassword: SFC<Props> = (props) => {
  const { spinner, selectCompany, step, companies } = props;

  const renderStep = (step: Step): JSX.Element => {
    switch (step) {
      case 'email':
        return <RequestPasswordForm spinner={spinner} onSubmit={restorePassword}/>;
      case 'confirm':
        return <ConfirmPasswordForm spinner={spinner} onSubmit={confirmEmail}/>;
      case 'companies':
        return <CompanyList companies={companies} onSelect={selectCompany}/>;
      case 'new':
        return <NewPasswordForm spinner={spinner} onSubmit={setNewPassword}/>;
    }
  };

  return (
    <div styleName="restore-password">
      {renderStep(step)}
    </div>
  );
};

/**
 * Decorators
 */
const StyledComponent = CSSModules(RestorePassword, require('./styles.css'));
export default connect<StateProps, DispatchProps, ComponentProps>(
  ({ auth: { restorePassword }}) => ({
    ...restorePassword,
    companies: companySelector(restorePassword)
  }),
  { selectCompany }
)(StyledComponent);
