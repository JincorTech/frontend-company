import * as React from 'react'
import { Component, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FieldArray, FormProps, SubmitHandler } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchActivities } from '../../../redux/modules/common/activityTypes'
import { updateProfile, fetchProfile, updateCities, StateMap as StateProps } from '../../../redux/modules/profile/profileEdit'
import { required, minLength, maxLength } from '../../../utils/validators'

import InfoItem from '../../../components/profile/InfoItem'
import CompanyLogo from '../../../components/profile/CompanyLogo'
import RenderInput from '../../../components/form/RenderInput'
import RenderSelect from '../../../containers/form/RenderSelect'
import RenderTextarea from '../../../components/form/RenderTextarea'
import RenderImageUpload from '../../../components/form/RenderImageUpload'
import RenderLinkInputs from '../../../components/form/RenderLinkInputs'
import RenderActivities from '../../../components/form/RenderActivities'
import Button from '../../../components/common/Button'


/**
 * Types
 */
export type Props = ReduxFormProps & DispatchProps & StateProps

export type ReduxFormProps = FormProps<FormFields, {}, any>

export type FormFields = {
  upload: string
  name: string
  country: string
  city: string
  type: string
  description: string
  activityTypes: string[]
  socialLinks: string[]
  email: string
  phone: string
}

export type DispatchProps = {
  fetchActivities: () => void
  fetchProfile: () => void
  updateCities: (countryId: string) => void
}


/**
 * Component
 */
class ProfileEdit extends Component<Props, {}> {
  constructor(props) {
    super(props)

    this.deleteLogo = this.deleteLogo.bind(this)
  }

  public componentWillMount(): void {
    const { fetchActivities, fetchProfile } = this.props

    fetchActivities()
    fetchProfile()
  }

  private deleteLogo(): void {
    const { change } = this.props

    change('upload', null)
  }

  public render(): JSX.Element {
    const { handleSubmit, updateCities, spinner, src, invalid } = this.props

    return (
      <form styleName="company-profile-edit" onSubmit={handleSubmit(updateProfile)}>
        <div styleName="company-logo">
          <Field
            name="upload"
            component={RenderImageUpload}
            defaultElement={<CompanyLogo/>}
            src={src}
            width={165}
            height={165}/>

          <button type="button" onClick={() => this.deleteLogo()} styleName="delete-logo">удалить</button>
        </div>

        <div styleName="company-info">
          <Field
            name="name"
            styleName="company-name"
            placeholder="Имя компании"
            validate={minLength(3)}
            component={RenderInput}/>

          <div styleName="region">
            <Field
              name="country"
              modalId="select-country"
              filter
              validate={required()}
              options={[]}
              onOptionSelect={(value) => updateCities(value)}
              component={RenderSelect}
              styleName="select-input"/>

            <Field
              name="city"
              modalId="select-city"
              filter
              options={[]}
              component={RenderSelect}
              styleName="select-input"/>
          </div>

          <InfoItem styleName="section-small" title="Тип компании">
            <Field
              name="type"
              validate={required()}
              modalId="select-company-type"
              placeholder="Тип компании"
              options={[]}
              component={RenderSelect}
              styleName="select-input"/>
          </InfoItem>

          <InfoItem styleName="section" title="Описание компании">
            <Field
              name="description"
              placeholder="Описание компании"
              maxLength={550}
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
              component={RenderInput}
              styleName="text-input"/>

            <Field
              name="phone"
              placeholder="Номер телефона"
              component={RenderInput}
              styleName="text-input"/>
          </InfoItem>
        </div>

        <div styleName="company-controls">
          <Button styleName="submit-btn" type="submit" spinner={spinner} disabled={invalid}>Сохранить</Button>
          <Link to="/app/profile" styleName="cancel-btn">отменить</Link>
        </div>
      </form>
    )
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(ProfileEdit, require('./styles.css'))

const FormComponent = reduxForm<FormFields, {}>({
  form: 'profileEdit'
})(StyledComponent)

export default connect<StateProps, DispatchProps, ReduxFormProps>(
  (state) => state.profile.profileEdit,
  { fetchActivities, fetchProfile, updateCities }
)(FormComponent)