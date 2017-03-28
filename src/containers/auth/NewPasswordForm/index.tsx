import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'
import { ActionCreator } from '../../../utils/actions'

import Form from '../../../components/form/Form'
import Button from '../../../components/common/Button'
import RenderPassword from '../../../components/form/RenderPassword'


export type FormFields = {
  password: string
}

export type ComponentProps = {
  passwordVisible: boolean
  onChangePasswordVisibility: ActionCreator<boolean>
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
}

export type NewPasswordProps = ComponentProps & FormProps<FormFields, ComponentProps, any>


class NewPasswordForm extends Component<NewPasswordProps, {}> {
  public render(): JSX.Element {
    const { invalid, passwordVisible, onChangePasswordVisibility } = this.props

    return (
      <Form
        styleName="new-password-form"
        title="Восстановление пароля"
        hint="Введите код из письма или перейдите по ссылке, отправленного на ваш email, после чего вы сможете назначить себе новый пароль.">

        <Field
          component={RenderPassword}
          name="password"
          visible={passwordVisible}
          onChangeVisibility={onChangePasswordVisibility}
          placeholder="Пароль"/>

        <Button type="submit" disabled={invalid}>Отправить</Button>
      </Form>
    )
  }
}

const StyledComponent = CSSModules(NewPasswordForm, require('./styles.css'))

export default reduxForm<FormFields, ComponentProps>({
  form: 'newPassword'
})(StyledComponent)