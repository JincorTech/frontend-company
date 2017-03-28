import * as React from 'react'
import { Component, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FieldArray, FormProps } from 'redux-form'
import { connect } from 'react-redux'

import { requestActivities } from '../../../redux/modules/profile/activityTypes'

import InfoItem from '../../../components/profile/InfoItem'
import CompanyLogoEdit from '../../../components/profile/CompanyLogoEdit'
import RenderInput from '../../../components/form/RenderInput'
import RenderCountrySelect from '../../../components/form/RenderCountrySelect'
import RenderSelect from '../../../components/form/RenderSelect'
import RenderTextarea from '../../../components/form/RenderTextarea'
import RenderLinkInputs from '../../../components/profile/RenderLinkInputs'
import RenderActivities from '../../form/RenderActivities'
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
  requestActivities: () => void
}


/**
 * Component
 */
class ProfileEdit extends Component<Props, {}> {
  public componentDidMount(): void {
    this.props.requestActivities()
  }

  public render(): JSX.Element {
    return (
      <form styleName="company-profile-edit">
        <div styleName="company-logo">
          <CompanyLogoEdit />
        </div>

        <div styleName="company-info">
          <Field
            name="name"
            component={RenderInput}/>

          <Field
            name="country"
            component={RenderCountrySelect}/>

          <Field
            name="city"
            component={RenderCountrySelect}/>

          <InfoItem title="Описание компании">
            <Field
              name="description"
              placeholder="Описание компании"
              component={RenderTextarea}/>
          </InfoItem>

          <InfoItem title="Сферы деятельности">
            <FieldArray
              name="activityTypes"
              component={RenderActivities}/>
          </InfoItem>

          <InfoItem title="Ссылки">
            <FieldArray
              name="socialLinks"
              component={RenderLinkInputs}/>
          </InfoItem>
        </div>

        <div styleName="company-controls">
          <input styleName="submit-btn" type="submit" value="Сохранить"/>
          <a styleName="cancel-btn">отменить</a>
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
  { requestActivities }
)(FormComponent)