import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'


export type Props = {
  email: string,
  invitedAt: string
}

const InvitedEmployee: SFC<Props> = ({ email, invitedAt }) => (
  <div styleName="employee">
    <div styleName="avatar">
      <div styleName="invitedImage"/>
    </div>

    <div styleName="info">
      <div styleName="email">{email}</div>
    </div>

    <div styleName="status">Приглашен {invitedAt}</div>
  </div>
)

export default CSSModules(InvitedEmployee, require('./styles.css'))
