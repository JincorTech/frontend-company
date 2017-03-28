import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import RenderInput from '../../../components/form/RenderInput'


export type PasswordFormFields = {
  email: string
}

export type ComponentProps = {
  onSubmit: SubmitHandler<PasswordFormFields, ComponentProps, any>
}

export type RequestPasswordProps = ComponentProps & FormProps<PasswordFormFields, ComponentProps, any>


class RequestPasswordForm extends Component<RequestPasswordProps, {}> {
  public render(): JSX.Element {
    const { invalid } = this.props

    return (
      <Form
        styleName="request-password-form"
        title="Восстановление пароля"
        hint="Введите email, указанный при регистрации, на который<br/>придет ссылка и код для сброса пароля.">

        <Field
          component={RenderInput}
          name="email"
          type="email"
          placeholder="Email"
        />

        <Button type="submit" disabled={invalid}>Отправить</Button>
      </Form>
    )
  }
}

const StyledComponent = CSSModules(RequestPasswordForm, require('./styles.css'))

export default reduxForm<PasswordFormFields, RequestPasswordProps>({
  form: 'requestPassword'
})(StyledComponent)