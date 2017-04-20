import * as React from 'react'
import { Component, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FieldArray, FormProps } from 'redux-form'
import { connect } from 'react-redux'

import { setEditable } from '../../../redux/modules/profile/profile'

import InfoItem from '../../../components/profile/InfoItem'
import RenderInput from '../../../components/form/RenderInput'
import RenderSelect from '../../../containers/form/RenderSelect'
import RenderTextarea from '../../../components/form/RenderTextarea'
import RenderImageUpload from '../../../components/form/RenderImageUpload'
import RenderLinkInputs from '../../../components/profile/RenderLinkInputs'
import RenderActivities from './components/RenderActivities'
import { SocialLinkProps } from '../../../components/profile/SocialLink'


/**
 * Types
 */
export type Props = ReduxFormProps & DispatchProps

export type ReduxFormProps = FormProps<FormFields, ComponentProps, any> & ComponentProps

export type ComponentProps = {
  logo: string
  name: string
  type: string
  region: string
  description: string
  email: string
  phone: string
  activities: ActivityType[]
  socialLinks: SocialLinkProps[]
}

export type ActivityType = {
  id: string
  name: string
}

export type FormFields = {
  name: string
  country: Option
  city: Option
  type: Option
  description: string
  activityTypes: Option[]
  socialLinks: Option[]
}

export type Option = {
  value: string
  name: string
}

export type DispatchProps = {
  setEditable: (value: boolean) => void
}

/**
 * Component
 */
class ProfileEdit extends Component<Props, {}> {
  public render(): JSX.Element {
    const { setEditable } = this.props

    return (
      <form styleName="company-profile-edit">
        <div styleName="company-logo">
          <Field
            name="upload"
            component={RenderImageUpload}
            width={165}
            height={165}/>
        </div>

        <div styleName="company-info">
          <Field
            name="name"
            styleName="company-name"
            placeholder="Имя компании"
            component={RenderInput}/>

          <div styleName="region">
            <Field
              name="country"
              modalId="select-country"
              filter
              options={[]}
              component={RenderSelect}/>

            <Field
              name="city"
              modalId="select-city"
              filter
              options={[]}
              component={RenderSelect}/>
          </div>

          <InfoItem styleName="section" title="Тип компании">
            <Field
              name="type"
              modalId="select-company-type"
              placeholder="Тип компании"
              options={[]}
              component={RenderSelect}/>
          </InfoItem>

          <InfoItem styleName="section" title="Описание компании">
            <Field
              name="description"
              placeholder="Описание компании"
              component={RenderTextarea}/>
          </InfoItem>

          <InfoItem styleName="section" title="Сферы деятельности">
            <FieldArray
              name="activityTypes"
              component={RenderActivities}/>
          </InfoItem>

          <InfoItem styleName="section" title="Ссылки">
            <FieldArray
              name="socialLinks"
              component={RenderLinkInputs}/>
          </InfoItem>

          <InfoItem styleName="section" title="Контакты">
            <Field
              name="email"
              placeholder="Email"
              component={RenderInput}/>

            <Field
              name="phone"
              placeholder="Номер телефона"
              component={RenderInput}/>
          </InfoItem>
        </div>

        <div styleName="company-controls">
          <input styleName="submit-btn" type="submit" value="Сохранить"/>
          <a styleName="cancel-btn" onClick={() => setEditable(false)}>отменить</a>
        </div>
      </form>
    )
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(ProfileEdit, require('./styles.css'))
const FormComponent = reduxForm<FormFields, ComponentProps>({ form: 'ProfileEdit' })(StyledComponent)
export default connect<{}, DispatchProps, ReduxFormProps>(
  (state) => ({}),
  { setEditable }
)(FormComponent)