import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FormProps, SubmitHandler } from 'redux-form'

import { required, minLength, maxLength } from '../../../../utils/validators'

import Button from '../../../../components/common/Button'
import RenderInput from '../../../../components/form/RenderInput'
import RenderImageUpload from '../../../../components/form/RenderImageUpload'


export type Props = ComponentProps & FormProps<FormFields, ComponentProps, any>

export type ComponentProps = {
  onMount: () => void
  onSubmit: SubmitHandler<FormFields, ComponentProps, any>
  onCancel: () => void
  avatar: string
  spinner: boolean
}

export type FormFields = {
  avatar: string
  firstName: string
  lastName: string
  position: string
}

class ProfileEdit extends Component<Props, {}> {
  public componentWillMount(): void {
    const { onMount } = this.props

    onMount()
  }

  public render(): JSX.Element {
    const { invalid, handleSubmit, onCancel, avatar, spinner } = this.props

    const blackout = (
      <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgba(0, 0, 0, .5)'}}>
        <div styleName="camera" style={{top: '20px', left: '20px', right: 'auto', bottom: 'auto'}}/>
      </div>
    )

    return (
      <form
        onSubmit={handleSubmit}
        styleName="profile-bottom-form">

        <div styleName="avatar-upload">
          <Field
            src={avatar}
            component={RenderImageUpload}
            overlay={blackout}
            name="avatar"
            width={325}
            height={325}/>
        </div>

        <Field
          component={RenderInput}
          validate={[
            required('Поле не может быть пустым'),
            maxLength(15, 'Максимум 15 символов')
          ]}
          name="firstName"
          type="text"
          placeholder="Имя"/>

        <Field
          component={RenderInput}
          validate={[
            required('Поле не может быть пустым'),
            maxLength(15, 'Максимум 15 символов')
          ]}
          name="lastName"
          type="text"
          placeholder="Фамилия"/>

        <Field
          component={RenderInput}
          validate={[
            maxLength(20, 'Максимум 20 символов')
          ]}
          name="position"
          type="text"
          placeholder="Должность"/>

        <div styleName="form-buttons">
          <Button type="button" styleName="form-cancel-button" onClick={onCancel}>отменить</Button>
          <Button type="submit" styleName="form-submit-button" disabled={invalid} spinner={spinner}>Сохранить</Button>
        </div>
      </form>
    )
  }
}

const StyledComponent = CSSModules(ProfileEdit, require('../styles.css'))
export default reduxForm<FormFields, ComponentProps>({
  form: 'ProfileCardEdit'
})(StyledComponent)