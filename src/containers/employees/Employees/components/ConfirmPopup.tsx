import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import Popup from '../../../../components/common/Popup'


type Props = HTMLProps<HTMLButtonElement> & {
  open: boolean,
  title: string
}

const ConfirmPopup: SFC<Props> = ({ open, title, children }) => (
  <Popup
      styleName="confirm-popup"
      open={open}
      hideClose={true}>
      <h4 styleName="popup-title">{title}</h4>
      <div styleName="popup-body">
        <div styleName="popup-buttons">
          {children}
        </div>
      </div>
    </Popup>
)

export default CSSModules(ConfirmPopup, require('../styles.css'))
