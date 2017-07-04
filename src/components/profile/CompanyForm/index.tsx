import * as React from 'react'
import { Component, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { reduxForm, Field, FieldArray, FormProps, SubmitHandler } from 'redux-form'
import { Link } from 'react-router'

import { updateProfile, FormFields } from '../../../redux/modules/profile/profileEdit'
import { required, minLength, maxLength } from '../../../utils/validators'

import InfoItem from '../../../components/profile/InfoItem'
import CompanyLogo from '../../../components/profile/CompanyLogo'
import RenderInput from '../../../components/form/RenderInput'
import RenderSelect from '../../../components/form/RenderSelect'
import RenderTextarea from '../../../components/form/RenderTextarea'
import RenderImageUpload from '../../../components/form/RenderImageUpload'
import RenderLinkInputs from '../../../components/form/RenderLinkInputs'
import RenderActivities from '../../../components/form/RenderActivities'
import Button from '../../../components/common/Button'


export type Props = ReduxFormProps & ComponentProps & HTMLProps<HTMLFormElement>

export type ComponentProps = {
  updateCities: (id: string) => void
  spinner: boolean
  logo: string
}

export type ReduxFormProps = FormProps<FormFields, {}, any>


class CompanyForm extends Component<Props, {}> {
  constructor(props) {
    super(props)

    this.deleteLogo = this.deleteLogo.bind(this)
  }

  private deleteLogo(): void {
    const { change } = this.props

    change('upload', null)
  }

  public render(): JSX.Element {
    const { handleSubmit, updateCities, spinner, logo, invalid, style } = this.props

    return (
      <form style={style} styleName="company-profile-edit" onSubmit={handleSubmit(updateProfile)}>
        <div styleName="company-logo">
          <Field
            name="upload"
            component={RenderImageUpload}
            defaultElement={<CompanyLogo/>}
            src={logo}
            width={165}
            height={165}/>

          <button type="button" onClick={() => this.deleteLogo()} styleName="delete-logo">удалить</button>
        </div>

        <div styleName="company-info">
          <Field
            name="name"
            styleName="company-name"
            placeholder="Имя компании"
            validate={[
              required(),
              minLength(3),
              maxLength(60)
            ]}
            component={RenderInput}/>

          <div styleName="region">
            <Field
              name="country"
              modalId="select-country"
              filter
              validate={required()}
              onOptionSelect={(value) => updateCities(value)}
              component={RenderSelect}
              styleName="select-input"/>

            <Field
              name="city"
              modalId="select-city"
              filter
              component={RenderSelect}
              styleName="select-input"/>
          </div>

          <InfoItem styleName="section-small" title="Тип компании">
            <Field
              name="type"
              validate={required()}
              modalId="select-company-type"
              placeholder="Тип компании"
              component={RenderSelect}
              styleName="select-input"/>
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
          <Link to="/cmp/app/profile" styleName="cancel-btn">отменить</Link>
        </div>
      </form>
    )
  }
}

const StyledComponent = CSSModules(CompanyForm, require('./styles.css'))

export default reduxForm<FormFields, ComponentProps>({
  form: 'profileEdit'
})(StyledComponent)