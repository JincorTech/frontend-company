import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import { getInitials, getBackgroundColor } from '../../../utils/colorFunction'

import Popup, { Props as PopupProps } from '../../common/Popup'

import { EmployeeCard as EmployeeCardState } from '../../../redux/modules/employees/employees'
import { UserCompany as UserCompanyProps } from '../../../redux/modules/app/appLayout'


export type Props =
  JSX.IntrinsicAttributes &
  JSX.IntrinsicClassAttributes<any> &
  PopupProps &
  EmployeeCardProps &
  EmployeeCardState

export type EmployeeCardProps = {
  company: UserCompanyProps
}

const EmployeeCard: SFC<Props> = ({ employee, company, ...popupProps }) => {
  const { id, profile } = employee
  const { legalName, picture } = company
  const backgroundColor = getBackgroundColor(id)
  const initials = getInitials(profile.name)

  return (
    <Popup styleName={profile.avatar ? 'employee-card' : 'employee-card-empty-avatar'} {...popupProps}>
      {
        profile.avatar
          ? <img styleName="avatar" src={profile.avatar}/>
          : <div styleName="avatar-empty" style={backgroundColor}>{initials}</div>
      }

      <div styleName="company">
        <div styleName="company-name">{legalName}</div>
        <div styleName={picture ? 'company-logo' : 'company-logo-empty'}>
          <img src={picture}/>
        </div>
      </div>

      <div styleName="info">
        <div styleName="full-name">{profile.name}</div>
        <div styleName="position">{profile.position}</div>
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
