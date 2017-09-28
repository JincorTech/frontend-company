import * as React from 'react';
import { Component } from 'react';
import * as CSSModules from 'react-css-modules';
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form';
import { translate } from 'react-i18next';

import { required, email, password, maxLength, minLength } from '../../../utils/validators';

import Form from '../../form/Form';
import Button from '../../common/Button';
import RenderInput from '../../form/RenderInput';
import RenderPassword from '../../form/RenderPassword';

/**
 * Types
 */
export type FormFields = {
  firstName: string
  lastName: string
  position: string
  email: string
  password: string
  verificationId: string
};

export type ComponentProps = {
  spinner: boolean
  verificationId: string,
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>,
  t: Function
};

export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>;

/**
 * Component
 */
class CreateAccountForm extends Component<Props, {}> {
  public componentDidMount(): void {
    const { change, verificationId } = this.props;

    change('verificationId', verificationId);
  }

  public render(): JSX.Element {
    const { t, invalid, handleSubmit, spinner } = this.props;

    return (
      <Form
        onSubmit={handleSubmit}
        styleName="create-account-form"
        title={t('userRegistration')}
        hint={t('userRegistrationHint')}>

        <Field
          component="input"
          name="verificationId"
          type="hidden"
          validate={required()}/>

        <Field
          component={RenderInput}
          name="firstName"
          type="text"
          placeholder={t('firstName')}
          validate={[
            required(),
            maxLength(15)
          ]}/>

        <Field
          component={RenderInput}
          name="lastName"
          type="text"
          placeholder={t('lastName')}
          validate={[
            required(),
            maxLength(15)
          ]}/>

        <Field
          component={RenderInput}
          name="position"
          type="text"
          placeholder={t('position')}
          validate={[
            required(),
            minLength(2),
            maxLength(60)
          ]}/>

        <Field
          component={RenderInput}
          name="email"
          type="email"
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

        <Button type="submit" spinner={spinner} disabled={invalid}>{t('next')}</Button>
      </Form>
    );
  }
}

/**
 * Decorators
 */
const StyledComponent = translate('auth')(CSSModules(CreateAccountForm, require('./styles.css')));

export default reduxForm<FormFields, ComponentProps>({
  form: 'account',
  initialValues: {
    lastName: '',
    firstName: '',
    position: '',
    email: '',
    password: '',
    verificationId: ''
  }
})(StyledComponent);
