import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'

import { initialValues, validate } from '../../../helpers/auth/confirmEmail'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import RenderInput from '../../../components/form/RenderInput'


export type FormFields = {
  verificationCode: string
  verificationId: string
}

export type ConfirmComponentProps = {
  verificationId: string,
  onSubmit: SubmitHandler<FormFields, ConfirmComponentProps, any>
}

export type ConfirmFormProps = ConfirmComponentProps & FormProps<FormFields, ConfirmComponentProps, any>


class ConfirmEmailForm extends Component<ConfirmFormProps, {}> {
  public componentDidMount(): void {
    const { change, verificationId } = this.props

    change('verificationId', verificationId)
  }

  public render(): JSX.Element {
    const { invalid, handleSubmit } = this.props

    return (
      <Form
        onSubmit={handleSubmit}
        styleName="confirm-email-form"
        title="Подтверждение регистрации"
        hint="Чтобы успешно зарегистрироваться, подтвердите регистрацию с помощью кода, присланного на ваш email">

        <Field
          component="input"
          name="verificationId"
          type="hidden"/>

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

export default reduxForm<FormFields, ConfirmComponentProps>({
  form: 'confirmEmail',
  initialValues,
  validate
})(StyledComponent)