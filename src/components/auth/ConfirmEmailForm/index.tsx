import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'

import { length, number, required } from '../../../utils/validators'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import RenderInput from '../../../components/form/RenderInput'


export type FormFields = {
  verificationCode: string
  verificationId: string
}

export type ConfirmComponentProps = {
  spinner: boolean
  verificationId: string,
  onSubmit: SubmitHandler<FormFields, ConfirmComponentProps, any>
}

export type ConfirmFormProps = ConfirmComponentProps & FormProps<FormFields, ConfirmComponentProps, any>


class ConfirmEmailForm extends Component<ConfirmFormProps, {}> {
  public componentDidMount(): void {
    const { change, verificationId, spinner } = this.props

    change('verificationId', verificationId)
  }

  public render(): JSX.Element {
    const { invalid, handleSubmit, spinner } = this.props

    return (
      <Form
        onSubmit={handleSubmit}
        styleName="confirm-email-form"
        title="Подтверждение регистрации"
        hint="Чтобы успешно зарегистрироваться, подтвердите регистрацию с помощью кода, присланного на ваш email">

        <Field
          component="input"
          name="verificationId"
          type="hidden"
          validate={required()}/>

        <Field
          component={RenderInput}
          name="verificationCode"
          type="text"
          placeholder="Введите код"
          validate={[number(), length(6)]}/>

        <Button type="submit" spinner={spinner} disabled={invalid}>Далее</Button>
      </Form>
    )
  }
}

const StyledComponent = CSSModules(ConfirmEmailForm, require('./styles.css'))

export default reduxForm<FormFields, ConfirmComponentProps>({
  form: 'confirmEmail',
  initialValues: {
    verificationCode: '',
    verificationId: ''
  }
})(StyledComponent)