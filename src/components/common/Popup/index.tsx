import * as React from 'react'
import { Component, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import Icon from '../Icon'

export type PopupProps = HTMLProps<HTMLDivElement> & {
  open?: boolean,
  onClose?: () => void
}

class Popup extends Component<PopupProps, {}> {
  public componentDidMount(): void {
    document.body.style.overflow = this.props.open ? 'hidden' : ''
  }

  public componentWillReceiveProps(nextProps): void {
    if (nextProps.open !== this.props.open) {
      document.body.style.overflow = nextProps.open ? 'hidden' : ''
    }
  }

  public render(): JSX.Element {
    const { open, onClose, ...divProps } = this.props

    return (
      open && <div styleName="popup-wrap" onClick={onClose}>
        <Icon styleName="close" name="close-popup" />

        <div
          styleName="popup"
          onClick={(e) => e.stopPropagation()}
          {...divProps}/>
      </div>
    )
  }
}

export default CSSModules(Popup, require('./styles.css'))