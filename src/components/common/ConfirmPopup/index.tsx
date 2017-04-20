import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import Popup, { Props as PopupProps } from '../Popup'
import Button from '../Button'


export type Props =
  JSX.IntrinsicAttributes &
  JSX.IntrinsicClassAttributes<any> &
  PopupProps &
  ComponentProps &
  DispatchProps

export type ComponentProps = {
  title: string,
  userId: string
}

export type DispatchProps = {
  onConfirm: (userId: string) => void
}


const ConfirmPopup: SFC<Props> = ({ title, userId, onClose, onConfirm, ...popupProps }) => (
  <Popup styleName="confirm-popup" onClose={onClose} {...popupProps}>
    <h4 styleName="popup-title">{title}</h4>

    <div styleName="popup-body">
      <div styleName="popup-buttons">
        <Button styleName="popup-cancel-button" onClick={() => onClose()}>Отменить</Button>
        <Button onClick={() => onConfirm(userId)}>Подтвердить</Button>
      </div>
    </div>
  </Popup>
)

export default CSSModules(ConfirmPopup, require('./styles.css'))
