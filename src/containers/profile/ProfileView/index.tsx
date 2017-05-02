import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'

import { openCompanyCard } from '../../../redux/modules/common/companyCard'
import { companySelector } from '../../../selectors/profile/profileView'

import Link from '../../../components/common/Link'
import CompanyLogo from '../../../components/profile/CompanyLogo'
import InfoItem from '../../../components/profile/InfoItem'
import SocialLink, { LinkProps } from '../../../components/profile/SocialLink'
import ContactItem from '../../../components/profile/ContactItem'
import Button from '../../../components/profile/Button'
import Text from '../../../components/profile/Text'
import CompanyCard from '../../../containers/common/CompanyCard'

/**
 * Types
 */
export type Props = DispatchProps & StateProps

export type StateProps = {
  id: string
  logo: string
  name: string
  type: string
  region: string
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
  openCompanyCard: () => void
}

/**
 * Component
 */
const CompanyProfile: SFC<Props> = (props) => {
  const {
    logo,
    name,
    type,
    region,
    description,
    email,
    phone,
    activities,
    socialLinks,
    openCompanyCard
  } = props

  return (
    <div styleName="company-profile">
      <div styleName="company-logo">
        <CompanyLogo src={logo} />
      </div>

      <div styleName="company-info">
        <h1 styleName="company-name">{name}</h1>

        <InfoItem title="Регион">
          <p styleName="value">{region}</p>
        </InfoItem>

        <InfoItem title="Тип компании">
          <p styleName="value">{type}</p>
        </InfoItem>

        <InfoItem title="Описание компании">
          <Text
            styleName="company-desc"
            value={description}/>
        </InfoItem>

        <InfoItem title="Сферы деятельности">
          <ul styleName="activities">
            {activities.map((activity, i) => <li styleName="activity" key={i}>{activity.name}</li>)}
          </ul>
        </InfoItem>

        <div styleName="contacts-block">
          <InfoItem styleName="social" title="Ссылки">
            <ul styleName="social-links">
              {socialLinks.map((social, i) => <SocialLink {...social} key={i}/>)}
            </ul>
          </InfoItem>

          <InfoItem styleName="contacts" title="Контакты">
            <ContactItem type="email" value={email}/>
            <ContactItem type="phone" value={phone}/>
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

        <a href="#" styleName="company-link">Сотрудники (5)</a>
      </div>

      <CompanyCard company={props}/>
    </div>
  )
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(CompanyProfile, require('./styles.css'))
export default connect<StateProps, DispatchProps, {}>(
  ({ profile: { profileView }}) => companySelector(profileView),
  { openCompanyCard }
)(StyledComponent)