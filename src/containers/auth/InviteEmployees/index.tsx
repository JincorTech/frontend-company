import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import * as jwtDecode from 'jwt-decode';

import { StateMap as StateProps } from '../../../redux/modules/auth/inviteEmployees';
import { FormFields as ConfirmFields } from '../../../components/auth/ConfirmEmailForm';

import { signupEmail } from '../../../redux/modules/auth/signUp';

import ProgressBar from '../../../components/auth/ProgressBar';
import InviteEmployeeForm from '../../../components/auth/InviteEmployee';

/**
 * Types
 */

export type Props = StateProps & DispatchProps & RouteComponentProps<{}, {}>;

export type DispatchProps = {
  signupEmail: (confirmFields: ConfirmFields) => void
};

/**
 * Component
 */

class InviteEmployees extends Component<Props, {}> {
  public componentDidMount(): void {
    const { location, router } = this.props;
    const { token, verificationId, verificationCode } = location.query;

    try {
      this.props.signupEmail({ verificationId, verificationCode });
    } catch (e) {
      router.replace('/cmp/auth/signin');
    }
  }

  public render(): JSX.Element {
    const { spinner } = this.props;

    return (
      <div styleName="signup">
        <ProgressBar currentStep={3}/>
        <InviteEmployeeForm spinner={spinner}/>
      </div>
    );
  }
}

const StyledComponent = CSSModules(InviteEmployees, require('./styles.css'));

export default connect<StateProps, DispatchProps, {}>(
  (state) => state.auth.inviteEmployees,
  {
    signupEmail
  }
)(StyledComponent);
