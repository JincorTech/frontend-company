import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import Icon from '../../common/Icon'
import CompanyLogo from '../../profile/CompanyLogo'

import { Company } from '../CompanyList'


export type Props = {
  company: Company
} & HTMLProps<HTMLDivElement>


const CompanyItem: SFC<Props> = ({ company, ...divProps }) => {
  const { src, legalName, country, type } = company

  return (
    <div styleName="company-item" {...divProps}>
      <div styleName="company-logo">
        <CompanyLogo src={src}/>
      </div>

      <div styleName="company-info">
        <h4 styleName="company-name">
          {legalName}
        </h4>
        <div styleName="company-type">{type}</div>
        <div styleName="company-country">{country}</div>
      </div>

      <Icon
        styleName="icon"
        name="arrow-right"/>
    </div>
  )
}

export default CSSModules(CompanyItem, require('./styles.css'))
