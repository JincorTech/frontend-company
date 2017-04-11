import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'

import EmployeeMenu from './components/EmployeeMenu'


export type Props = ComponentProps & DispatchProps

export type ComponentProps = {
  employee: ActiveEmployeeProps
}

export type ActiveEmployeeProps = {
  id: string,
  admin: boolean,
  avatar: string,
  email: string,
  fullName: string,
  position: string
}

export type DispatchProps = {
  onDelete: (e) => void,
  onMakeAdmin: (e) => void,
  onOpenProfile: (employee: ActiveEmployeeProps) => void
}

const ActiveEmployee: SFC<Props> = props => {
  const {
    employee,
    onDelete,
    onMakeAdmin,
    onOpenProfile
  } = props

  const {
    id,
    admin,
    avatar,
    email,
    fullName,
    position
  } = employee

  return (
    <div styleName="employee" onClick={() => onOpenProfile(employee)}>
      <div styleName="avatar">
        <img src={avatar}/>
      </div>

      <div styleName="info">
        <div styleName="full-name">
          {fullName} {admin && <span styleName="label">Администратор</span>}
        </div>
        <div styleName="email-n-position">
          <div styleName="email-slide">
            <div>{email}</div>
            <div>{position}</div>
          </div>
        </div>
      </div>

      <EmployeeMenu>
        <button
          type="button"
          styleName="menu-button"
          onClick={e => onMakeAdmin(e)}>
          Назначить администратором</button>

        <button
          type="button"
          styleName="menu-button"
          onClick={() => onOpenProfile(employee)}>
          Открыть профиль</button>

        <button
          type="button"
          styleName="menu-button-danger"
          onClick={e => onDelete(e)}>
          Удалить пользователя</button>
      </EmployeeMenu>
    </div>
  )
}

export default CSSModules(ActiveEmployee, require('./styles.css'))
