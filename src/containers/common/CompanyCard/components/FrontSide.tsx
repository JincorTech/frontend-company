import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import Icon from '../../../../components/common/Icon'
import Link from '../../../../components/common/Link'
import CompanyLogo from '../../../../components/profile/CompanyLogo'
import ContactItem from '../../../../components/profile/ContactItem'
import SocialLink, { SocialLinkProps } from '../../../../components/profile/SocialLink'


export type Props = HTMLProps<HTMLDivElement> & CardFrontProps

export type CardFrontProps = {
  logo: string
  name: string
  region: string
  email: string
  phone: string
  activities: ActivityType[]
  socialLinks: SocialLinkProps[]
  onFlip: () => void
}

export type ActivityType = {
  id: string
  name: string
}

const CompanyCardFront: SFC<Props> = (props) => {
  const {
    logo,
    name,
    region,
    email,
    phone,
    activities,
    socialLinks,
    onFlip,
    ...divProps
  } = props

  return (
    <div styleName="company-card-front" {...divProps}>
      <CompanyLogo styleName="logo" src={logo}/>
      <h1 styleName="title">{name}</h1>

      <div styleName="region">{region}</div>
      <Link styleName="write-button" to="/" withBorder>Редактировать</Link>

      <div styleName="contacts">
        {activities.map((activity, i) => (
          <ContactItem styleName="contact" key={i} type="activity" value={activity.name}/>
        ))}
        <ContactItem styleName="contact" type="phone" value={phone}/>
        <ContactItem styleName="contact" type="email" value={email}/>
      </div>

      <ul styleName="social-links">
        {socialLinks.map(({ iconUrl, url }, i) => (
          <SocialLink styleName="social-link" key={i} iconUrl={iconUrl} url={url} hideName />
        ))}
      </ul>

      <Icon styleName="favorite" name="star"/>
      <Icon styleName="flip" name="flip" onClick={onFlip}/>
    </div>
  )
}

export default CSSModules(CompanyCardFront, require('../styles.css'))