import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import colorFunction from '../../../utils/colorFunction'

import Popup, { Props as PopupProps } from '../../common/Popup'


export type Props = JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<any> & PopupProps & {
  id: string,
  avatar?: string,
  fullName: string,
  position: string,
  companyName: string,
  companyLogo?: string
}

const EmployeeCard: SFC<Props> = props => {
  const {
    id,
    avatar,
    fullName,
    position,
    companyName,
    companyLogo,
    ...popupProps
  } = props

  /**
   * TODO
   * BUG: При закрытии карточки профиля все валится.
   */
  // const { color, initials } = colorFunction(fullName, id)

  return (
    <Popup styleName="employee-card" {...popupProps}>
      {/*{
        avatar
          ? <img styleName="avatar" src={avatar}/>
          : <div styleName="avatar-empty" style={{backgroundColor: color}}>{initials}</div>
      }*/}

      <img styleName="avatar" src={avatar}/>

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
