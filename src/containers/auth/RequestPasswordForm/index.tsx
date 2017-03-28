import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import RenderInput from '../../../components/form/RenderInput'


export type FormFields = {
  email: string
}

export type ComponentProps = {
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
}

export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>


class RequestPasswordForm extends Component<Props, {}> {
  public render(): JSX.Element {
    const { invalid } = this.props

    return (
      <Form
        styleName="request-password-form"
        title="Восстановление пароля"
        hint="Введите email, указанный при регистрации, на который придет ссылка и код для сброса пароля.">

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

export default reduxForm<FormFields, ComponentProps>({
  form: 'requestPassword'
})(StyledComponent)