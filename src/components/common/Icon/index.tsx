import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


export type IconProps = HTMLProps<HTMLSpanElement> & {
  name: 'arrow-down'| 'arrow-down-red' | 'arrow-right' |
  'close' | 'eye' | 'eye-active' | 'flip' | 'star' |
  'camera' | 'close-popup' | 'sort-down' | 'plus' |
  'phone' | 'email' | 'activity' | 'close-alert' |
  'logout' | 'lock' | 'pencil'
}

const Icon: SFC<IconProps> = ({ name, ...spanProps }) => <span styleName={name} {...spanProps}/>

export default CSSModules(Icon, require('./styles.css'))
