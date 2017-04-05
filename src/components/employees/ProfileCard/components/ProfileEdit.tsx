import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'

import Form from '../../../../components/form/Form'
import Button from '../../../../components/common/Button'
import RenderInput from '../../../../components/form/RenderInput'


export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>

export type ComponentProps = {
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
}

export type FormFields = {
  firstName: string,
  lastName: string,
  position: string
}

class ProfileEdit extends Component<Props, {}> {
  public render(): JSX.Element {
    const { invalid, handleSubmit } = this.props

    return (
      <form
        onSubmit={handleSubmit}
        styleName="profile-bottom-form">

        <Field
          component={RenderInput}
          name="first-name"
          type="text"
          placeholder="Имя"/>

        <Field
          component={RenderInput}
          name="second-name"
          type="text"
          placeholder="Фамилия"/>

        <Field
          component={RenderInput}
          name="position"
          type="text"
          placeholder="Должность"/>

        <div styleName="form-buttons">
          <Button type="button" styleName="form-cancel-button">отменить</Button>
          <Button type="submit" styleName="form-submit-button" disabled={invalid}>Сохранить</Button>
        </div>
      </form>
    )
  }
}

const StyledComponent = CSSModules(ProfileEdit, require('../styles.css'))

export default reduxForm<FormFields, ComponentProps>({ form: '' })(StyledComponent)
