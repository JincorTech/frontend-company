import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'
import { ActionCreator } from '../../../utils/actions'

import { initialValues, validate } from '../../../helpers/auth/newPassword'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import RenderPassword from '../../../components/form/RenderPassword'


/**
 * Types
 */
export type FormFields = {
  password: string
}

export type ComponentProps = {
  spinner: boolean
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
}

export type NewPasswordProps = ComponentProps & FormProps<FormFields, ComponentProps, any>

/**
 * Component
 */
class NewPasswordForm extends Component<NewPasswordProps, {}> {
  public render(): JSX.Element {
    const { invalid, spinner, handleSubmit } = this.props

    return (
      <Form
        onSubmit={handleSubmit}
        styleName="new-password-form"
        title="Восстановление пароля"
        hint="Введите email, указанный при регистрации, на который придет ссылка и код для сброса пароля.">

        <Field
          component={RenderPassword}
          name="password"
          placeholder="Пароль"/>

        <Button type="submit" spinner={spinner} disabled={invalid}>Отправить</Button>
      </Form>
    )
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(NewPasswordForm, require('./styles.css'))
export default reduxForm<FormFields, ComponentProps>({
  form: 'newPassword',
  validate,
  initialValues
})(StyledComponent)