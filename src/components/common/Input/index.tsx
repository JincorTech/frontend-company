import * as React from 'react'
import { Component, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


export type Props = HTMLProps<HTMLInputElement> & {
  invalid?: boolean
}


export class Input extends Component<Props, {}> {
  public inputElement: HTMLInputElement

  public render(): JSX.Element {
    const { invalid, ...inputProps } = this.props

    return (
      <input styleName={invalid ? 'invalid' : 'default'} ref={(input) => this.inputElement = input} {...inputProps} />
    )
  }
}

export default CSSModules(Input, require('./styles.css'))