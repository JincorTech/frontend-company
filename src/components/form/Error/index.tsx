import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

export type Props = HTMLProps<HTMLDivElement> & {
  msg: string
}

const Error: SFC<Props> = ({ msg }) => (
  <div styleName="error">{msg}</div>
)

export default CSSModules(Error, require('./styles.css'))