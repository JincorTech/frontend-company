import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import Popup, { Props as PopupProps } from '../Popup'
import Button from '../Button'


export type Props = JSX.IntrinsicAttributes & JSX.IntrinsicClassAttributes<any> & PopupProps & {
  title: string
}

const ConfirmPopup: SFC<Props> = ({ title, ...popupProps }) => (
  <Popup styleName="confirm-popup" {...popupProps}>
    <h4 styleName="popup-title">{title}</h4>

    <div styleName="popup-body">
      <div styleName="popup-buttons">
        <Button styleName="popup-cancel-button">Отменить</Button>
        <Button>Подтвердить</Button>
      </div>
    </div>
  </Popup>
)

export default CSSModules(ConfirmPopup, require('./styles.css'))
