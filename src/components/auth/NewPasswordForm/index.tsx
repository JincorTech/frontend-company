import * as React from 'react';
import { Component } from 'react';
import * as CSSModules from 'react-css-modules';
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form';
import { ActionCreator } from '../../../utils/actions';

import { password, required } from '../../../utils/validators';

import Form from '../../form/Form';
import Button from '../../common/Button';
import RenderPassword from '../../form/RenderPassword';

/**
 * Types
 */

export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>;

export type FormFields = {
  password: string
};

export type ComponentProps = {
  spinner: boolean
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
};

/**
 * Component
 */
class NewPasswordForm extends Component<Props, {}> {
  public render(): JSX.Element {
    const { invalid, spinner, handleSubmit } = this.props;

    return (
      <Form
        onSubmit={handleSubmit}
        styleName="new-password-form"
        title="Новый пароль">

        <Field
          component={RenderPassword}
          name="password"
          placeholder="Пароль"
          validate={[
            required(),
            password()
          ]}
          warn={password('Пароль должен состоять как минимум из 6 символов, содержать буквы разного регистра и цифры.')}/>

        <Button type="submit" spinner={spinner} disabled={invalid}>Сохранить и войти</Button>
      </Form>
    );
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(NewPasswordForm, require('./styles.css'));

export default reduxForm<FormFields, ComponentProps>({
  form: 'newPassword',
  initialValues: {
    password: ''
  }
})(StyledComponent);
