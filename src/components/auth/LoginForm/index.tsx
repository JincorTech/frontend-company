import * as React from 'react';
import { Component } from 'react';
import * as CSSModules from 'react-css-modules';
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form';
import { routes } from '../../../routes';
import { Link } from 'react-router';
import { translate } from 'react-i18next';

import { ActionCreator } from '../../../utils/actions';
import { email, password, required } from '../../../utils/validators';

import Form from '../../form/Form';
import Button from '../../common/Button';
import RenderInput from '../../form/RenderInput';
import RenderPassword from '../../form/RenderPassword';

/**
 * Types
 */
export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>;

export type ComponentProps = {
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
  spinner: boolean,
  t: Function
};

export type FormFields = {
  email: string
  password: string
};

/**
 * Component
 */
class LogInForm extends Component<Props, {}> {
  public render(): JSX.Element {
    const { t, invalid, handleSubmit, spinner } = this.props;

    return (
      <Form
        onSubmit={handleSubmit}
        styleName="login-form"
        title={t('login')}>

        <Field
          component={RenderInput}
          name="email"
          type="text"
          placeholder={t('email')}
          validate={[
            required(),
            email()
          ]}/>

        <Field
          component={RenderPassword}
          name="password"
          placeholder={t('password')}
          validate={[
            required(),
            password()
          ]}
          warn={password(t('passwordWarning'))}/>

        <Button type="submit" spinner={spinner} disabled={invalid}>{t('signIn')}</Button>

        <Link styleName="restore-password" to={routes.restorePassword}>{t('forgotPassword')}</Link>
      </Form>
    );
  }
}

const StyledComponent = CSSModules(LogInForm, require('./styles.css'));
const TranslatedComponent = translate('auth')(StyledComponent);

export default reduxForm<FormFields, ComponentProps>({
  form: 'account',
  initialValues: {
    email: '',
    password: ''
  }
})(TranslatedComponent);
