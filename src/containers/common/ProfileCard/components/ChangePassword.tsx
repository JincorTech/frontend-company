import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'

import { initialValues, validate } from '../../../../helpers/common/profileCardChangePassword'

import Button from '../../../../components/common/Button'
import RenderPassword from '../../../../components/form/RenderPassword'


export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>

export type ComponentProps = {
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>,
  onCancel: () => void
}

export type FormFields = {
  oldPassword: string,
  password: string
}

class ChangePassword extends Component<Props, {}> {
  public render(): JSX.Element {
    const { invalid, handleSubmit, onCancel } = this.props

    return (
      <form
        onSubmit={handleSubmit}
        styleName="profile-bottom-form">

        <Field
          component={RenderPassword}
          name="oldPassword"
          type="password"
          placeholder="Старый пароль"/>

        <Field
          component={RenderPassword}
          name="password"
          type="password"
          placeholder="Новый пароль"/>

        <div styleName="form-buttons">
          <Button type="button" styleName="form-cancel-button" onClick={onCancel}>отменить</Button>
          <Button type="submit" styleName="form-submit-button" disabled={invalid}>Сохранить</Button>
        </div>
      </form>
    )
  }
}

const StyledComponent = CSSModules(ChangePassword, require('../styles.css'))
export default reduxForm<FormFields, ComponentProps>({
  form: 'ProfileCardEdit',
  initialValues,
  validate
})(StyledComponent)
