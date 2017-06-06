import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { format } from 'date-fns'
import { getBackgroundColor, getInitials } from '../../../utils/colorFunction'

import { DeletedEmployee as DeletedEmployeeProps } from '../../../redux/modules/employees/employees'


export type Props = ComponentProps

export type ComponentProps = {
  employee: DeletedEmployeeProps
}

const DeletedEmployee: SFC<Props> = ({ employee }) => {
  const { id, profile, contacts, meta } = employee
  const backgroundColor = getBackgroundColor(id)
  const initials = getInitials(profile.name)

  return (
    <div styleName="employee">
      {
        profile.avatar
          ? <img styleName="avatar" src={profile.avatar}/>
          : <div styleName="avatar-empty" style={backgroundColor}>{initials}</div>
      }

      <div styleName="info">
        <div styleName="full-name">{profile.name}</div>
        <div styleName="email-n-position">
          <div styleName="email-slide">
            <div>{profile.position}</div>
            <div>{contacts.email}</div>
          </div>
        </div>
      </div>

      <div styleName="status">Удален {format(meta.deletedAt, 'DD.MM.YYYY')}</div>
    </div>
  )
}

export default CSSModules(DeletedEmployee, require('./styles.css'))
