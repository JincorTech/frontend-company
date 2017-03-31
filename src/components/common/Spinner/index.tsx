import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


export type ButtonProps = HTMLProps<HTMLDivElement>

const DEGREES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]

const Button: SFC<ButtonProps> = (props) => (
  <div styleName="spinner" {...props}>
    {DEGREES.map((deg) => <div key={deg} styleName={`stick-${deg}`}/>)}
  </div>
)

export default CSSModules(Button, require('./styles.css'))