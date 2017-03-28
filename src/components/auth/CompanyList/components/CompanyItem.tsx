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
    <div styleName="item" {...divProps}>
      <div styleName="logo">
        {src && <img src={src} alt=""/>}
      </div>

      <div styleName="info">
        <h4 styleName="name">
          {name}
        </h4>
        <div styleName="type">{type}</div>
        <div styleName="country">{country}</div>
      </div>

      <Icon
        styleName="icon"
        name="arrow-right"/>
    </div>
  )
}

export default CSSModules(CompanyItem, require('../styles.css'))
