import * as Notifications from 'react-notification-system-redux'

export const notify = (type: string, title: string, message: string) => {

  return Notifications.show({
    title,
    message,
    position: 'tl',
    dismissible: true,
    autoDismiss: 3
  }, type)
}
