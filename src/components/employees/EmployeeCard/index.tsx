import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'

import colorFunction from '../../../utils/colorFunction'

import Popup from '../../common/Popup'


export type Props = {
  open: boolean,
  id: string,
  avatar?: string,
  fullName: string,
  position: string,
  companyName: string,
  companyLogo?: string
}

const EmployeeCard: SFC<Props> = props => {
  const {
    open,
    id,
    avatar,
    fullName,
    position,
    companyName,
    companyLogo
  } = props

  const { color, initials } = colorFunction(fullName, id)

  return (
    <Popup open={open} styleName="employee-card">
      {
        avatar
          ? <img styleName="avatar" src={avatar}/>
          : <div styleName="avatar-empty" style={{backgroundColor: color}}>{initials}</div>
      }

      <div styleName="company">
        <div styleName="company-name">{companyName}</div>
        <div styleName="company-logo">
          <img src={companyLogo}/>
        </div>
      </div>

      <div styleName="info">
        <div styleName="full-name">{fullName}</div>
        <div styleName="position">{position}</div>
      </div>

      <div styleName="buttons">
        <button type="button">Сообщение</button>
        <button type="button">Добавить в контакты</button>
        <button type="button">Заблокировать</button>
      </div>
    </Popup>
  )
}

export default CSSModules(EmployeeCard, require('./styles.css'))
