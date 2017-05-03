import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import { connect } from 'react-redux'
import * as CSSModules from 'react-css-modules'
import { openCompanyCard, closeCompanyCard, flipCompanyCard } from '../../../redux/modules/common/companyCard'

import { LinkProps } from '../../../components/profile/SocialLink'
import Popup from '../../../components/common/FullscreenPopup'
import Button from '../../../components/common/Button'
import Icon from '../../../components/common/Icon'
import SocialLink from '../../../components/profile/SocialLink'
import CompanyLogo from '../../../components/profile/CompanyLogo'


export type Props = ComponentProps & StateProps & DispatchProps

export type ComponentProps = HTMLProps<HTMLDivElement> & {
  company: CompanyInfo
}

export type CompanyInfo = {
  logo: string
  name: string
  type: string
  city: string
  country: string
  email: string
  phone: string
  activities: any
  socialLinks: LinkProps[]
  description: string
}

export type StateProps = {
  open: boolean
}

export type DispatchProps = {
  openCompanyCard: () => void,
  closeCompanyCard: () => void
}

/**
 * CompanyCard
 */
const CompanyCard: SFC<Props> = props => {
  const { open, company, closeCompanyCard } = props
  const { logo, type, name, city, country, description, email, phone, activities, socialLinks } = company

  return (
    <Popup
      styleName="company-card"
      modalId="company-card"
      open={open}
      onClose={closeCompanyCard}>

      <div styleName="top">
        <div styleName="logo">
          <CompanyLogo src={logo}/>
        </div>
        <div styleName="title">
          <div styleName="inner">
            <div styleName="name">{name}</div>
            <span styleName="address">{city ? `${country}, ${city}` : country}</span>
            <div styleName="buttons">
              <Button styleName="transparent-button">Написать</Button>
              <button styleName="bookmark" type="button"><Icon styleName="icon" name="bookmark"/></button>
            </div>
          </div>
        </div>
      </div>

      <div styleName={description ? 'bottom' : 'bottom-small'}>
        {description &&
        <div styleName="about">
          <p>{description}</p>
        </div>}

        <div styleName="info">
          <ul>
            <li styleName="item"><Icon styleName="icon" name="company-type"/>{type}</li>

            {activities.length
              ? activities.map((activity, i) =>
                <li styleName="item" key={i}><Icon styleName="icon" name="activity"/>{activity.name}</li>)
              : <li styleName="item-empty"><Icon styleName="icon" name="activity"/>Отрасли не указаны</li>}

            {phone
              ? <li styleName="item"><Icon styleName="icon" name="phone"/>{phone}</li>
              : <li styleName="item-empty"><Icon styleName="icon" name="phone"/>Телефон не указан</li>}

            {email
              ? <li styleName="item"><Icon styleName="icon" name="email"/>{email}</li>
              : <li styleName="item-empty"><Icon styleName="icon" name="email"/>Email не указан</li>}
          </ul>

          <div styleName="socials">
            {Boolean(socialLinks.length) &&
            <ul styleName="social-links">
              {socialLinks.map((social, i) => <SocialLink {...social} key={i}/>)}
            </ul>}
          </div>
        </div>
      </div>
    </Popup>
  )
}

const StyledComponent = CSSModules(CompanyCard, require('./styles.css'))

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => state.common.companyCard,
  {
    openCompanyCard,
    closeCompanyCard,
    flipCompanyCard
  }
)(StyledComponent)