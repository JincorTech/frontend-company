import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'


export type Props = ComponentProps

export type ComponentProps = {
  employee: InvitedEmployeeProps
}

export type InvitedEmployeeProps = {
  id: string,
  email: string,
  invitedAt: string
}

const InvitedEmployee: SFC<Props> = ({ employee }) => {
  const { email, invitedAt } = employee

  return (
    <div styleName="employee">
      <div styleName="avatar">
        <div styleName="invited-image"/>
      </div>

      <div styleName="info">
        <div styleName="email">{email}</div>
      </div>

      <div styleName="status">Приглашен {invitedAt}</div>
    </div>
  )
}

export default CSSModules(InvitedEmployee, require('./styles.css'))
