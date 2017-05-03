import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'
import { ActionCreator } from '../../../utils/actions'

import { validate, initialValues } from '../../../helpers/auth/loginForm'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import { Link } from 'react-router'
import RenderInput from '../../../components/form/RenderInput'
import RenderPassword from '../../../components/form/RenderPassword'


/**
 * Types
 */
export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>

export type ComponentProps = {
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
  spinner: boolean
}

export type FormFields = {
  email: string
  password: string
}

/**
 * Component
 */
class LogInForm extends Component<Props, {}> {
  public render(): JSX.Element {
    const { invalid, handleSubmit, spinner } = this.props

    return (
      <Form
        onSubmit={handleSubmit}
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
          placeholder="Пароль"/>

        <Button type="submit" spinner={spinner} disabled={invalid}>Войти</Button>

        <Link styleName="restore-password" to="/auth/password">Забыли пароль?</Link>
      </Form>
    )
  }
}

const StyledComponent = CSSModules(LogInForm, require('./styles.css'))

export default reduxForm<FormFields, ComponentProps>({
  form: 'account',
  initialValues,
  validate
})(StyledComponent)