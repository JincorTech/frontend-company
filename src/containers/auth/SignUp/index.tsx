import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import {
  createCompany,
  createAccount,
  confirmEmail,
  StateMap as StateProps,
  Step
} from '../../../redux/modules/auth/signUp';

import ProgressBar from '../../../components/auth/ProgressBar';
import CreateCompanyForm from '../../../components/auth/CreateCompanyForm';
import CreateAccountForm from '../../../components/auth/CreateAccountForm';
import ConfirmEmailForm from '../../../components/auth/ConfirmEmailForm';
import InviteEmployeeForm from '../../../components/auth/InviteEmployee';

export type Props = ComponentProps & StateProps;

export type ComponentProps = HTMLProps<HTMLDivElement>;

const SignUp: SFC<Props> = (props) => {
  const {
    step,
    spinner,
    stepIndex,
    verificationId,
    company: { token }
  } = props;

  const renderForm = (step: Step) => {
    switch (step) {
      case 'company':
        return <CreateCompanyForm
          spinner={spinner}
          onSubmit={createCompany}/>;
      case 'account':
        return <CreateAccountForm
          spinner={spinner}
          onSubmit={createAccount}
          token={token}/>;
      case 'email':
        return <ConfirmEmailForm
          spinner={spinner}
          onSubmit={confirmEmail}
          verificationId={verificationId}/>;
      case 'employee':
        return <InviteEmployeeForm
          spinner={spinner}/>;
    }
  };

  return (
    <div styleName="signup">
      <ProgressBar currentStep={stepIndex}/>
      {renderForm(step)}
    </div>
  );
};

const StyledComponent = CSSModules(SignUp, require('./styles.css'));
export default connect<StateProps, {}, Props>(
  (state) => state.auth.signUp
)(StyledComponent);
