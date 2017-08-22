import * as React from 'react'
import { connect } from 'react-redux'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import * as Notifications from 'react-notification-system-redux'

import style from './style'

export type Props = HTMLProps<HTMLDivElement> & ComponentProps

export type ComponentProps = {
  notifications: any
}

const Notification: SFC<Props> = (props) => (
  <div styleName="notifications">
    <Notifications
      notifications={props.notifications}
      style={style}
    />
  </div>
)

const StyledComponent = CSSModules(Notification, require('./styles.css'))

export default connect(
  (state) => ({
    notifications: state.notifications
  }), {}
)(StyledComponent)
