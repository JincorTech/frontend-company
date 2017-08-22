const notificationColors = {
  defaultVal: {
    color: {
      hex: '#9da0a4'
    }
  },
  success: {
    color: {
      hex: '#36b144'
    }
  },
  error: {
    color: {
      hex: '#ec3d3d'
    }
  },
  warning: {
    color: {
      hex: '#fc3'
    }
  },
  info: {
    color: {
      hex: '#4094e8'
    }
  }
}

const style = {
  NotificationItem: {
    DefaultStyle: {
      margin: '10px 5px 20px 1px',
      textAlign: 'left',
      fontSize: '15px',
      padding: '12px 36px',
      borderRadius: '2px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px 0 #737373',
      color: notificationColors.defaultVal.color.hex
    },
    success: {
      color: notificationColors.defaultVal.color.hex
    },
    error: {
      color: notificationColors.defaultVal.color.hex
    },
    warning: {
      color: notificationColors.defaultVal.color.hex
    },
    info: {
      color: notificationColors.defaultVal.color.hex
    }
  },
  Title: {
    DefaultStyle: {},
    success: {
      color: notificationColors.success.color.hex
    },
    error: {
      color: notificationColors.error.color.hex
    },
    warning: {
      color: notificationColors.warning.color.hex
    },
    info: {
      color: notificationColors.info.color.hex
    }
  },
  Dismiss: {
    DefaultStyle: {
      backgroundColor: 'transparent'
    },
    success: {
      color: notificationColors.success.color.hex
    },
    error: {
      color: notificationColors.error.color.hex
    },
    warning: {
      color: notificationColors.warning.color.hex
    },
    info: {
      color: notificationColors.info.color.hex
    }
  }
}

export default style
