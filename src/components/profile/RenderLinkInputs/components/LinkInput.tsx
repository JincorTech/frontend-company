import * as React from 'react'
import { Component, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

import Input, { InputProps } from '../../../../components/common/Input'


export type SocialInputProps =  JSX.IntrinsicClassAttributes<InputProps> & InputProps & {
  onRemove: () => void
}

class SocialInput extends Component<SocialInputProps, {}> {
  public render(): JSX.Element {
    const { onRemove, ...inputProps } = this.props

    return (
      <div styleName="social-input">
        <Input styleName="input" {...inputProps}/>
        <a styleName="link" children="удалить" onClick={onRemove}/>
      </div>
    )
  }
}

export default CSSModules(SocialInput, require('../styles.css'))