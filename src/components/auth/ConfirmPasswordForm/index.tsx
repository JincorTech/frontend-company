import * as React from 'react';
import { Component } from 'react';
import * as CSSModules from 'react-css-modules';
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form';
import { translate } from 'react-i18next';

import { number, length } from '../../../utils/validators';

import Form from '../../../components/form/Form';
import Button from '../../../components/common/Button';
import RenderInput from '../../../components/form/RenderInput';

/**
 * Types
 */
export type FormFields = {
  verificationCode: string
};

export type ComponentProps = {
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
  spinner: boolean,
  t: Function
};

export type ConfirmFormProps = ComponentProps & FormProps<FormFields, ComponentProps, any>;

/**
 * Component
 */
class ConfirmPasswordForm extends Component<ConfirmFormProps, {}> {
  public render(): JSX.Element {
    const { t, invalid, spinner, handleSubmit } = this.props;

    return (
      <Form
        onSubmit={handleSubmit}
        styleName="confirm-password-form"
        title={t('passwordRecovery')}
        hint={t('passwordRecoveryHint')}>

        <Field
          component={RenderInput}
          name="verificationCode"
          type="text"
          placeholder={t('enterCode')}
          validate={[number(), length(6)]}/>

        <Button type="submit" spinner={spinner} disabled={invalid}>{t('reset')}</Button>
      </Form>
    );
  }
}

/**
 * Decorators
 */
const StyledComponent = translate('auth')(CSSModules(ConfirmPasswordForm, require('./styles.css')));
export default reduxForm<FormFields, ComponentProps>({
  form: 'confirmPassword',
  initialValues: {
    verificationCode: ''
  }
})(StyledComponent);
