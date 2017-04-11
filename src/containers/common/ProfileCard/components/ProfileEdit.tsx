import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'

import { initialValues, validate } from '../../../../helpers/common/profileCardEditProfile'

import Button from '../../../../components/common/Button'
import RenderInput from '../../../../components/form/RenderInput'
import RenderImageUpload from '../../../../components/form/RenderImageUpload'
import FormErrors from '../../../../components/common/FormErrors'


export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>

export type ComponentProps = {
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>,
  onCancel: () => void,
  avatar: string
}

export type FormFields = {
  firstName: string,
  lastName: string,
  position: string
}

class ProfileEdit extends Component<Props, {}> {
  public render(): JSX.Element {
    const { invalid, error, handleSubmit, onCancel, avatar } = this.props

    return (
      <form
        onSubmit={handleSubmit}
        styleName="profile-bottom-form">

        {error && <FormErrors errors={error}/>}

        <div styleName="avatar-upload">
          <Field
            src={avatar}
            component={RenderImageUpload}
            name="upload"
            camPosition="left-top"
            width={325}
            height={325}/>
        </div>

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

        <div styleName="form-buttons">
          <Button type="button" styleName="form-cancel-button" onClick={onCancel}>отменить</Button>
          <Button type="submit" styleName="form-submit-button" disabled={invalid}>Сохранить</Button>
        </div>
      </form>
    )
  }
}

const StyledComponent = CSSModules(ProfileEdit, require('../styles.css'))
export default reduxForm<FormFields, ComponentProps>({
  form: 'ProfileCardEdit',
  initialValues,
  validate
})(StyledComponent)