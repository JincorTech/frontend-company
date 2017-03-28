import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'

import { initialValues, validate } from '../../../helpers/auth/createAccount'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import RenderInput from '../../../components/form/RenderInput'
import RenderPassword from '../../../components/form/RenderPassword'

/**
 * Types
 */
export type FormFields = {
  firstName: string
  lastName: string
  position: string
  email: string
  password: string
  verificationId: string
}

export type ComponentProps = {
  verificationId: string,
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
}

export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>

/**
 * Component
 */
class CreateAccountForm extends Component<Props, {}> {
  public componentDidMount(): void {
    const { change, verificationId } = this.props

    change('verificationId', verificationId)
  }

  public render(): JSX.Element {
    const { invalid, handleSubmit } = this.props

    return (
      <Form
        onSubmit={handleSubmit}
        styleName="create-account-form"
        title="Регистрация пользователя"
        hint="Чтобы начать совместную работу со своими коллегами, зарегистрируйте первого пользователя">

        <Field
          component="input"
          name="verificationId"
          type="hidden"/>

        <Field
          component={RenderInput}
          name="firstName"
          type="text"
          placeholder="Имя"/>

        <Field
          component={RenderInput}
          name="lastName"
          type="text"
          placeholder="Фамилия"/>

        <Field
          component={RenderInput}
          name="position"
          type="text"
          placeholder="Должность"/>

        <Field
          component={RenderInput}
          name="email"
          type="email"
          placeholder="Email"/>

        <Field
          component={RenderPassword}
          name="password"
          visible={false}
          onChangeVisibility={() => console.log('sdsas')}
          placeholder="Пароль"/>

        <Button type="submit" disabled={invalid}>Далее</Button>
      </Form>
    )
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(CreateAccountForm, require('./styles.css'))

export default reduxForm<FormFields, ComponentProps>({
  form: 'account',
  initialValues,
  validate
})(StyledComponent)