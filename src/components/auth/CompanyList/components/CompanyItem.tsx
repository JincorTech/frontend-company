import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import Icon from '../../../common/Icon'


export type CompanyProps = {
  name: string
  country?: string,
  type?: string,
  src?: string,
} & HTMLProps<HTMLDivElement>

const CompanyItem: SFC<CompanyProps> = (props) => {
  const { src, name, country, type, ...divProps } = props

  return (
    <div styleName="company-item" {...divProps}>
      <div styleName="company-logo">
        {src && <img src={src} alt=""/>}
      </div>

      <div styleName="company-info">
        <h4 styleName="company-name">
          {name}
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

export default CSSModules(CompanyItem, require('../styles.css'))
