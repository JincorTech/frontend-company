import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import RenderInput from '../../../components/form/RenderInput'


export type EmailFormFields = {
  verificationCode: string
  verificationId: string
}

export type ConfirmComponentProps = {
  verificationId: string,
  onSubmit: SubmitHandler<EmailFormFields, ConfirmComponentProps, any>
}

export type ConfirmFormProps = ConfirmComponentProps & FormProps<EmailFormFields, ConfirmComponentProps, any>


class ConfirmEmailForm extends Component<ConfirmFormProps, {}> {
  public render(): JSX.Element {
    const { invalid } = this.props

    return (
      <Form
        styleName="confirm-email-form"
        title="Подтверждение регистрации"
        hint="Чтобы успешно зарегистрироваться, подтвердите регистрацию с помощью кода, присланного на ваш email">

        <Field
          component={RenderInput}
          name="verificationCode"
          type="text"
          placeholder="Введите код"
        />

        <Button type="submit" disabled={invalid}>Далее</Button>
      </Form>
    )
  }
}

const StyledComponent = CSSModules(ConfirmEmailForm, require('./styles.css'))

export default reduxForm<EmailFormFields, ConfirmComponentProps>({
  form: 'confirmEmail'
})(StyledComponent)