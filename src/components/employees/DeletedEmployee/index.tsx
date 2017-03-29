import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'


export type Props = {
  avatar?: string,
  email: string,
  fullName: string,
  deletedAt: string,
  position: string
}

const DeletedEmployee: SFC<Props> = ({ avatar, email, fullName, deletedAt, position }) => (
  <div styleName="employee">
    <div styleName="avatar">
      <img src={avatar}/>
    </div>

    <div styleName="info">
      <div styleName="fullName">{fullName}</div>
      <div styleName="emailNPosition">
        <span styleName="slideEffect" data-email={email}>{position}</span>
      </div>
    </div>

    <div styleName="status">Удален {deletedAt}</div>
  </div>
)

export default CSSModules(DeletedEmployee, require('./styles.css'))
