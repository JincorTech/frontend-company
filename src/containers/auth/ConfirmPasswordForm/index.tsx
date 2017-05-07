import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'

import { initialValues, validate } from '../../../helpers/auth/confirmPassword'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import RenderInput from '../../../components/form/RenderInput'


/**
 * Types
 */
export type FormFields = {
  verificationCode: string
}

export type ComponentProps = {
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
  spinner: boolean
}

export type ConfirmFormProps = ComponentProps & FormProps<FormFields, ComponentProps, any>

/**
 * Component
 */
class ConfirmPasswordForm extends Component<ConfirmFormProps, {}> {
  public render(): JSX.Element {
    const { invalid, spinner, handleSubmit } = this.props

    return (
      <Form
        onSubmit={handleSubmit}
        styleName="confirm-password-form"
        title="Восстановление пароля"
        hint="Введите код из письма или перейдите по ссылке, отправленного на ваш email, после чего вы сможете назначить себе новый пароль.">

        <Field
          component={RenderInput}
          name="verificationCode"
          type="text"
          placeholder="Введите код"
        />

        <Button type="submit" spinner={spinner} disabled={invalid}>Сбросить</Button>
      </Form>
    )
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(ConfirmPasswordForm, require('./styles.css'))
export default reduxForm<FormFields, ComponentProps>({
  form: 'confirmPassword',
  initialValues,
  validate
})(StyledComponent)