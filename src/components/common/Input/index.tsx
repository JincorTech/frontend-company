import * as React from 'react'
import { Component, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


export type InputProps = HTMLProps<HTMLInputElement> & {
  invalid?: boolean
}


export class Input extends Component<InputProps, {}> {
  public inputElement: HTMLInputElement

  public render(): JSX.Element {
    const { invalid, ...inputProps } = this.props

    return (
      <input styleName={invalid ? 'invalid' : 'default'} ref={(input) => this.inputElement = input} {...inputProps} />
    )
  }
}

export default CSSModules(Input, require('./styles.css'))