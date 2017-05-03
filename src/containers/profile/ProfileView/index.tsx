import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { openCompanyCard } from '../../../redux/modules/common/companyCard'
import { fetchCompany } from '../../../redux/modules/profile/profileView'
import { companySelector } from '../../../selectors/profile/profileView'

import CompanyLogo from '../../../components/profile/CompanyLogo'
import InfoItem from '../../../components/profile/InfoItem'
import SocialLink, { LinkProps } from '../../../components/profile/SocialLink'
import ContactItem from '../../../components/profile/ContactItem'
import Button from '../../../components/profile/Button'
import Text from '../../../components/profile/Text'
import CompanyCard from '../../../containers/common/CompanyCard'


export type Props = DispatchProps & StateProps

export type StateProps = {
  id: string
  logo: string
  name: string
  type: string
  city: string
  country: string
  description: string
  email: string
  phone: string
  activities: ActivityType[]
  socialLinks: LinkProps[]
}

export type ActivityType = {
  id: string
  name: string
  code: string
}

export type DispatchProps = {
  fetchCompany: () => void
  openCompanyCard: () => void
}


class CompanyProfile extends Component<Props, StateProps> {
  private componentDidMount(): void {
    this.props.fetchCompany()
  }

  public render(): JSX.Element {
    const {
      logo, name, type, city, country, description,
      email, phone, activities, socialLinks, openCompanyCard
    } = this.props

    return (
      <div styleName="company-profile">
        <div styleName="company-logo">
          <CompanyLogo src={logo} />
        </div>

        <div styleName="company-info">
          <h1 styleName="company-name">{name}</h1>

          <InfoItem title="Регион">
            <p styleName="value">{city ? `${country}, ${city}` : country}</p>
          </InfoItem>

          <InfoItem title="Тип компании">
            <p styleName="value">{type}</p>
          </InfoItem>

          <InfoItem title="Описание компании">
            {description
              ? <Text styleName="company-desc" value={description}/>
              : <div styleName="empty-value">Не заполнено</div>
            }
          </InfoItem>

          <InfoItem title="Сферы деятельности">
            {activities.length
              ? <ul styleName="activities">
                {activities.map((activity, i) => <li styleName="activity" key={i}>{activity.name}</li>)}
              </ul>
              : <div styleName="empty-value">Не заполнено</div>}
          </InfoItem>

          <div styleName="contacts-block">
            <InfoItem styleName="social" title="Ссылки">
              {socialLinks.length
                ? <ul styleName="social-links">
                  {socialLinks.map((social, i) => <SocialLink {...social} key={i}/>)}
                </ul>
                : <div styleName="empty-value">Не заполнено</div>}
            </InfoItem>

            <InfoItem styleName="contacts" title="Контакты">
              {email && <ContactItem type="email" value={email}/>}
              {phone && <ContactItem type="phone" value={phone}/>}
              {email || phone || <div styleName="empty-value">Не заполнено</div>}
            </InfoItem>
          </div>
        </div>

        <div styleName="controls-block">
          <Button
            styleName="edit-button"
            children="Редактировать"/>

          <a
            onClick={() => openCompanyCard()}
            styleName="company-link"
            children="Посмотреть в виде карточки"/>

          <Link to="/app/employees" styleName="company-link">Сотрудники (5)</Link>
        </div>

        <CompanyCard company={this.props}/>
      </div>
    )
  }
}


const StyledComponent = CSSModules(CompanyProfile, require('./styles.css'))
export default connect<StateProps, DispatchProps, {}>(
  ({ profile: { profileView }}) => companySelector(profileView),
  { openCompanyCard, fetchCompany }
)(StyledComponent)