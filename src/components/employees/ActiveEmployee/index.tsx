import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'

import EmployeeMenu from './components/EmployeeMenu'


export type Props = {
  id: string,
  admin: boolean,
  avatar: string,
  email: string,
  fullName: string,
  position: string
}

const ActiveEmployee: SFC<Props> = props => {
  const {
    id,
    admin,
    avatar,
    email,
    fullName,
    position
  } = props

  return (
    <div styleName="employee">
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
          onClick={ () => { console.log(`${fullName} admin now! (no)`) }}>
          Назначить администратором</button>

        <button
          type="button"
          styleName="menu-button"
          onClick={ () => { console.log(`${fullName} profile open`) }}>
          Открыть профиль</button>

        <button
          type="button"
          styleName="menu-button-danger"
          onClick={ () => { console.log(`${fullName} has been deleted`) }}>
          Удалить пользователя</button>
      </EmployeeMenu>
    </div>
  )
}

export default CSSModules(ActiveEmployee, require('./styles.css'))
