import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import Button from '../../common/Button'
import Icon from '../../common/Icon'

import { Company } from '../../../redux/modules/profile/profileView'

import SocialLink from '../../profile/SocialLink'
import CompanyLogo from '../../profile/CompanyLogo'


export type Props = HTMLProps<HTMLDivElement> & {
  company: Company
}


const CompanyCard: SFC<Props> = ({ company, ...divProps }) => {
  const { legalName, profile, economicalActivityTypes, companyType } = company
  const { picture, links, email, phone, address } = profile

  return (
    <div styleName="card" {...divProps}>
      <button type="button" styleName="bookmark" onClick={e => e.stopPropagation()}>
        <Icon styleName="bookmark-icon" name="bookmark"/>
      </button>

      <div styleName="logo">
        <CompanyLogo src={picture}/>
      </div>

      <div styleName="name">{legalName}</div>
      <div styleName="address">{address.country.name || ''} {address.city ? address.city.name : ''}</div>
      <div styleName="button"><Button styleName="btn" bStyle="outline" onClick={e => e.stopPropagation()}>Написать</Button></div>
      <div styleName="activity"><Icon styleName="icon" name="activity"/>{companyType.name}</div>
      <div styleName="socials">
        {Boolean(links.length) && links.map((link, i) => <SocialLink styleName="social" displayName={false} size={28} {...link} key={link.value + i}/>)}
      </div>
    </div>
  )
}


export default CSSModules(CompanyCard, require('./styles.css'))
