import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'

import Button from '../../common/Button'
import Icon from '../../common/Icon'

export type Props = {
  name?: string
}


const CompanyCard: SFC<Props> = props => {
  return (
    <div styleName="card">
      <button type="button" styleName="bookmark">
        <Icon styleName="bookmark-icon" name="bookmark"/>
      </button>

      <div styleName="logo">
        <img src="https://static.sporcle.com/small/930175.png?v=1479411141"/>
      </div>

      <div styleName="name">{props.name}</div>
      <div styleName="address">Chicago, USA</div>
      <div styleName="button"><Button styleName="btn" bStyle="outline">Написать</Button></div>
      <div styleName="activity"><Icon styleName="icon" name="activity"/>Банковский сектор</div>
      <div styleName="socials">
        <a href="javascript:void(0)"><Icon styleName="soc-icon" name="social-instagram"/></a>
        <a href="javascript:void(0)"><Icon styleName="soc-icon" name="social-twitter"/></a>
        <a href="javascript:void(0)"><Icon styleName="soc-icon" name="social-facebook"/></a>
      </div>
    </div>
  )
}


export default CSSModules(CompanyCard, require('./styles.css'))