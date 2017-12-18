import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { registerEmployee, StateMap as StateProps } from '../../../redux/modules/auth/registerEmployee';

import RegisterEmployeeForm from '../../../components/auth/RegisterEmployeeForm';

/**
 * Types
 */
export type Props = StateProps & ComponentProps;

export type ComponentProps = {
  token: string
  companyName: string
  pin: string
  email: string
  t: Function
};

/**
 * Component
 */
export const RegisterEmployee: SFC<Props> = ({ companyName, t, ...props }) => {
  console.log(props);
  return (
    <div styleName="register-employee">
      <p styleName="title">{t('companyInvite')} {companyName}</p>

      <RegisterEmployeeForm
        {...props}
        onSubmit={registerEmployee}/>
    </div>
  );
};

const StyledComponent = CSSModules(RegisterEmployee, require('./styles.css'));
const TranslatedComponent = translate('auth')(StyledComponent);

export default connect<StateProps, {}, {}>(
  (state) => state.auth.registerEmployee
)(TranslatedComponent);
