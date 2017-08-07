import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { SubmitHandler } from 'redux-form';

import LogInForm from '../../../components/auth/LoginForm';
import CompanyList, { Company } from '../../../components/auth/CompanyList';

import { fetchCompanies, selectCompany, Employee } from '../../../redux/modules/auth/signIn';
import { companySelector } from '../../../selectors/auth/signIn';

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & StateProps & DispatchProps;

export type StateProps = {
  spinner: boolean
  step: 'login' | 'companies'
  companies: Company[]
};

export type DispatchProps = {
  selectCompany: (companyId: string) => void
};

/**
 * Component
 */
const SignUp: SFC<Props> = (props) => {
  const { selectCompany, companies, spinner, step } = props;

  const renderStep = (step: string) => {
    switch (step) {
      case 'login':
        return <LogInForm spinner={spinner} onSubmit={fetchCompanies}/>;
      case 'companies':
        return <CompanyList companies={companies} onSelect={selectCompany}/>;
    }
  };

  return (
    <div styleName="signin">
      {renderStep(step)}
    </div>
  );
};

/**
 * Decorators
 */
const StyledComponents = CSSModules(SignUp, require('./styles.css'));

export default connect<StateProps, DispatchProps, {}>(
  ({ auth: { signIn }}) => ({
    step: signIn.step,
    spinner: signIn.spinner,
    companies: companySelector(signIn)
  }),
  { selectCompany }
)(StyledComponents);
