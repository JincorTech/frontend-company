import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'
import { ActionCreator } from '../../../utils/actions'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import RenderInput from '../../../components/form/RenderInput'
import RenderPassword from '../../../components/form/RenderPassword'


export type LogInFormFields = {
  email: string
  password: string
}

export type LogInComponentProps = {
  passwordVisible: boolean
  onSubmit: SubmitHandler<LogInFormFields, LogInComponentProps, any>
  onChangePasswordVibility: ActionCreator<boolean>
}

export type LogInFormProps = LogInComponentProps & FormProps<LogInFormFields, LogInComponentProps, any>


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
      </Form>
    )
  }
}

const StyledComponent = CSSModules(LogInForm, require('./styles.css'))

export default reduxForm<LogInFormFields, LogInComponentProps>({
  form: 'account'
})(StyledComponent)