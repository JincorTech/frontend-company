import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'

import Form from '../../../../components/form/Form'
import Button from '../../../../components/common/Button'
import RenderPassword from '../../../../components/form/RenderPassword'


export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>

export type ComponentProps = {
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
}

export type FormFields = {
  oldPassword: string,
  newPassword: string
}

class ChangePassword extends Component<Props, {}> {
  public render(): JSX.Element {
    const { invalid, handleSubmit } = this.props

    return (
      <form
        onSubmit={handleSubmit}
        styleName="profile-bottom-form">

        <Field
          component={RenderPassword}
          name="password"
          type="password"
          placeholder="Старый пароль"/>

        <Field
          component={RenderPassword}
          name="new-password"
          type="password"
          placeholder="Новый пароль"/>

        <div styleName="form-buttons">
          <Button type="button" styleName="form-cancel-button">отменить</Button>
          <Button type="submit" styleName="form-submit-button" disabled={invalid}>Сохранить</Button>
        </div>
      </form>
    )
  }
}

const StyledComponent = CSSModules(ChangePassword, require('../styles.css'))

export default reduxForm<FormFields, ComponentProps>({ form: '' })(StyledComponent)
