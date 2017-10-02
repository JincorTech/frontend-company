import * as React from 'react';
import { Component } from 'react';
import * as CSSModules from 'react-css-modules';
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form';
import { translate } from 'react-i18next';

import { required, email, password, minLength, maxLength } from '../../../utils/validators';

import Form from '../../../components/form/Form';
import Button from '../../../components/common/Button';
import RenderInput from '../../../components/form/RenderInput';
import RenderPassword from '../../../components/form/RenderPassword';

/**
 * Types
 */
export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>;

export type FormFields = {
  verificationId: string
  pin: string
  email: string
  firstName: string
  lastName: string
  position: string
  password: string
};

export type ComponentProps = {
  spinner: boolean
  verificationId: string
  pin: string
  email: string
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>,
  t: Function
};

/**
 * Component
 */
class CreateAccountForm extends Component<Props, {}> {
  public componentDidMount(): void {
    const { change, verificationId, pin, email } = this.props;

    change('verificationId', verificationId);
    change('pin', pin);
    change('email', email);
  }

  public render(): JSX.Element {
    const { t, invalid, handleSubmit, spinner } = this.props;

    return (
      <Form
        onSubmit={handleSubmit}
        styleName="create-employee-form"
        title={t('userRegistration')}
        hint={t('userRegistrationHint')}>

        <Field
          component="input"
          name="verificationId"
          type="hidden"
          validate={required()}/>

        <Field
          component="input"
          name="pin"
          type="hidden"
          validate={required()}/>

        <Field
          component="input"
          name="email"
          type="hidden"
          validate={[
            required(),
            email()
          ]}/>

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
          component={RenderPassword}
          name="password"
          placeholder={t('password')}
          validate={[
            required(),
            password()
          ]}
          warn={password(t('passwordWarning'))}/>

        <Button
          type="submit"
          spinner={spinner}
          disabled={invalid}
          children={t('next')}/>
      </Form>
    );
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(CreateAccountForm, require('./styles.css'));
const TranslatedComponent = translate('auth')(StyledComponent);

export default reduxForm<FormFields, ComponentProps>({
  form: 'employee',
  initialValues: {
    lastName: '',
    firstName: '',
    position: '',
    password: '',
    verificationId: '',
    pin: '',
    email: ''
  }
})(TranslatedComponent);
