import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'

import EmployeeMenu from './components/EmployeeMenu'


export type Props = {
  admin: boolean,
  avatar: string,
  email: string,
  fullName: string,
  position: string
}

const ActiveEmployee: SFC<Props> = ({ admin, avatar, email, fullName, position }) => (
  <div styleName="employee">
    <div styleName="avatar">
      <img src={avatar}/>
    </div>

    <div styleName="info">
      <div styleName="fullName">
        {fullName} {admin && <span styleName="label">Администратор</span>}
      </div>
      <div styleName="emailNPosition">
        <span styleName="slideEffect" data-email={email}>{position}</span>
      </div>
    </div>

    <EmployeeMenu>
      <button
        type="button"
        styleName="menuButton"
        onClick={ () => { console.log(`${fullName} admin now! (no)`) }}>
        Назначить администратором</button>

      <button
        type="button"
        styleName="menuButton"
        onClick={ () => { console.log(`${fullName} profile open`) }}>
        Открыть профиль</button>

      <button
        type="button"
        styleName="menuButtonDanger"
        onClick={ () => { console.log(`remove ${fullName} from employees list`) }}>
        Удалить пользователя</button>
    </EmployeeMenu>
  </div>
)

export default CSSModules(ActiveEmployee, require('./styles.css'))
