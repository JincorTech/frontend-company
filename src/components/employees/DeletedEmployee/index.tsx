import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'


export type Props = ComponentProps

export type ComponentProps = {
  employee: DeletedEmployeeProps
}

export type DeletedEmployeeProps = {
  id: string,
  avatar?: string,
  email: string,
  fullName: string,
  deletedAt: string,
  position: string
}

const DeletedEmployee: SFC<Props> = ({ employee }) => {
  const {
    avatar,
    email,
    fullName,
    deletedAt,
    position
  } = employee

  return (
    <div styleName="employee">
      <div styleName="avatar">
        <img src={avatar}/>
      </div>

      <div styleName="info">
        <div styleName="full-name">{fullName}</div>
        <div styleName="email-n-position">
          <div styleName="email-slide">
            <div>{email}</div>
            <div>{position}</div>
          </div>
        </div>
      </div>

      <div styleName="status">Удален {deletedAt}</div>
    </div>
  )
}

export default CSSModules(DeletedEmployee, require('./styles.css'))
