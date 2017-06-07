import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'

import { required, email, password, minLength, maxLength } from '../../../utils/validators'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import RenderInput from '../../../components/form/RenderInput'
import RenderPassword from '../../../components/form/RenderPassword'


/**
 * Types
 */
export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>

export type FormFields = {
  verificationId: string
  pin: string
  email: string
  firstName: string
  lastName: string
  position: string
  password: string
}

export type ComponentProps = {
  spinner: boolean
  verificationId: string
  pin: string
  email: string
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
}


/**
 * Component
 */
class CreateAccountForm extends Component<Props, {}> {
  public componentDidMount(): void {
    const { change, verificationId, pin, email } = this.props

    change('verificationId', verificationId)
    change('pin', pin)
    change('email', email)
  }

  public render(): JSX.Element {
    const { invalid, handleSubmit, spinner } = this.props

    return (
      <Form
        onSubmit={handleSubmit}
        styleName="create-employee-form"
        title="Регистрация пользователя"
        hint="Чтобы начать совместную работу со своими коллегами, зарегистрируйте первого пользователя">

        <Field
          component="input"
          name="verificationId"
          type="hidden"
          validate={required()}/>

        <Field
          component="input"
          name="pin"
          type="hidden"
          validate={required()}/>

        <Field
          component="input"
          name="email"
          type="hidden"
          validate={[
            required(),
            email()
          ]}/>

        <Field
          component={RenderInput}
          name="firstName"
          type="text"
          placeholder="Имя"
          validate={[
            required(),
            maxLength(15)
          ]}/>

        <Field
          component={RenderInput}
          name="lastName"
          type="text"
          placeholder="Фамилия"
          validate={[
            required(),
            maxLength(15)
          ]}/>

        <Field
          component={RenderInput}
          name="position"
          type="text"
          placeholder="Должность"
          validate={[
            required(),
            minLength(2),
            maxLength(60)
          ]}/>

        <Field
          component={RenderPassword}
          name="password"
          placeholder="Пароль"
          validate={[
            required(),
            password()
          ]}
          warn={password('Пароль должен состоять как минимум из 6 символов, содержать буквы разного регистра и цифры.')}/>

        <Button
          type="submit"
          spinner={spinner}
          disabled={invalid}
          children="Далее"/>
      </Form>
    )
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(CreateAccountForm, require('./styles.css'))

export default reduxForm<FormFields, ComponentProps>({
  form: 'employee',
  initialValues: {
    lastName: '',
    firstName: '',
    position: '',
    password: '',
    verificationId: '',
    pin: '',
    email: ''
  }
})(StyledComponent)