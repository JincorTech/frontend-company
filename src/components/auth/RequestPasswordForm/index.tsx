import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'

import { email, required } from '../../../utils/validators'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import RenderInput from '../../../components/form/RenderInput'


/**
 * Types
 */
export type FormFields = {
  email: string
}

export type ComponentProps = {
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>,
  spinner: boolean
}

export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>

/**
 * Component
 */
class RequestPasswordForm extends Component<Props, {}> {
  public render(): JSX.Element {
    const { spinner, invalid, handleSubmit } = this.props

    return (
      <Form
        onSubmit={handleSubmit}
        styleName="request-password-form"
        title="Восстановление пароля"
        hint="Введите email, указанный при регистрации, на который придет ссылка и код для сброса пароля.">

        <Field
          component={RenderInput}
          name="email"
          type="email"
          placeholder="Email"
          validate={[
            required(),
            email()
          ]}/>

        <Button type="submit" spinner={spinner} disabled={invalid}>Подтвердить</Button>
      </Form>
    )
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(RequestPasswordForm, require('./styles.css'))
export default reduxForm<FormFields, ComponentProps>({
  form: 'requestPassword',
  initialValues: {
    email: ''
  }
})(StyledComponent)