import * as React from 'react'
import { SFC, MouseEvent } from 'react'
import * as CSSModules from 'react-css-modules'

import { getBackgroundColor, getInitials } from '../../../utils/colorFunction'

import EmployeeMenu from './components/EmployeeMenu'

import { ActiveEmployee as ActiveEmployeeProps } from '../../../redux/modules/employees/employees'
import { StateMap as AuthProps } from '../../../redux/modules/app/app'


export type Props = ComponentProps & DispatchProps

export type ComponentProps = {
  employee: ActiveEmployeeProps
  auth: AuthProps
}

export type DispatchProps = {
  onDelete: (e: MouseEvent<HTMLButtonElement>, id: string) => void,
  onMakeAdmin: (e: MouseEvent<HTMLButtonElement>, id: string) => void,
  onUnmakeAdmin: (e: MouseEvent<HTMLButtonElement>, id: string) => void,
  onOpenProfile: (employee: ActiveEmployeeProps) => void
}

const ActiveEmployee: SFC<Props> = props => {
  const { auth, employee, onDelete, onMakeAdmin, onUnmakeAdmin, onOpenProfile } = props
  const { id, contacts, profile } = employee
  const backgroundColor = getBackgroundColor(id)
  const initials = getInitials(profile.name)

  return (
    <div styleName="employee" onClick={() => onOpenProfile(employee)}>
      {
        profile.avatar
          ? <img styleName="avatar" src={profile.avatar}/>
          : <div styleName="avatar-empty" style={backgroundColor}>{initials}</div>
      }

      <div styleName="info">
        <div styleName="full-name">
          {profile.name} {profile.role === 'company-admin' && <span styleName="label">Администратор</span>}
        </div>
        <div styleName="email-n-position">
          <div styleName="email-slide">
            <div>{profile.position}</div>
            <div>{contacts.email}</div>
          </div>
        </div>
      </div>

      {auth.admin && <EmployeeMenu>
        {profile.role === 'company-admin'
          ? <button
            type="button"
            styleName="menu-button"
            onClick={e => onUnmakeAdmin(e, employee.id)}>
            Лишить прав администратора</button>
          : <button
            type="button"
            styleName="menu-button"
            onClick={e => onMakeAdmin(e, employee.id)}>
            Назначить администратором</button>}

        <button
          type="button"
          styleName="menu-button"
          onClick={() => onOpenProfile(employee)}>
          Открыть профиль</button>

        <button
          type="button"
          styleName="menu-button-danger"
          onClick={e => onDelete(e, employee.id)}>
          Удалить пользователя</button>
      </EmployeeMenu>}
    </div>
  )
}

export default CSSModules(ActiveEmployee, require('./styles.css'))
