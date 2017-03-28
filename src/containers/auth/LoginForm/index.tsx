import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'
import { ActionCreator } from '../../../utils/actions'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import Link from '../../../components/common/Link'
import RenderInput from '../../../components/form/RenderInput'
import RenderPassword from '../../../components/form/RenderPassword'

/**
 * Types
 */
export type FormFields = {
  email: string
  password: string
}

export type ComponentProps = {
  passwordVisible: boolean
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
  onChangePasswordVibility: ActionCreator<boolean>
}

export type LogInFormProps = ComponentProps & FormProps<FormFields, ComponentProps, any>

/**
 * Component
 */
class LogInForm extends Component<LogInFormProps, {}> {
  public render(): JSX.Element {
    const { invalid, passwordVisible, onChangePasswordVibility } = this.props

    return (
      <Form
        styleName="login-form"
        title="Вход">

        <Field
          component={RenderInput}
          name="email"
          type="text"
          placeholder="Email"/>

        <Field
          component={RenderPassword}
          name="password"
          visible={passwordVisible}
          onChangeVisibility={onChangePasswordVibility}
          placeholder="Пароль"/>

        <Button type="submit" disabled={invalid}>Далее</Button>

        <Link styleName="restore-password" to="/auth/restore">Забыли пароль?</Link>
      </Form>
    )
  }
}

const StyledComponent = CSSModules(LogInForm, require('./styles.css'))

export default reduxForm<FormFields, ComponentProps>({
  form: 'account'
})(StyledComponent)