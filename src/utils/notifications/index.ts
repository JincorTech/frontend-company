import * as Notifications from 'react-notification-system-redux'

export const notify = (type: string, message: string) => Notifications.show({
  message,
  position: 'tl',
  dismissible: true,
  autoDismiss: 9999
}, type)
