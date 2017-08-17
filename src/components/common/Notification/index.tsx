import * as React from 'react'
import { connect } from 'react-redux'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import * as Notifications from 'react-notification-system-redux'

export type Props = HTMLProps<HTMLDivElement> & ComponentProps

export type ComponentProps = {
  notifications: any
}

const Notification: SFC<Props> = (props) => {
  const style = {
    NotificationItem: {
      DefaultStyle: {
        margin: '10px 5px 20px 1px',
        textAlign: 'center',
        fontSize: '18px',
        padding: '12px 36px',
        borderRadius: '2px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px 0 #737373',
        color: '#9da0a4'
      },
      error: {
        backgroundColor: '#ff999d',
        boxShadow: '0 2px 4px 0 #ff999d',
      }
    }
  }

  return (
    <div styleName="notifications">
      <Notifications
        notifications={props.notifications}
        style={style}
      />
    </div>
  )
}

const StyledComponent = CSSModules(Notification, require('./styles.css'))

export default connect(
  (state) => ({
    notifications: state.notifications
  }), {}
)(StyledComponent)
