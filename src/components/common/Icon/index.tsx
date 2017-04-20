import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


export type IconProps = HTMLProps<HTMLSpanElement> & {
  name: 'arrow-down'
    | 'arrow-down-red'
    | 'arrow-right'
    | 'close'
    | 'eye'
    | 'eye-active'
    | 'flip'
    | 'star'
    | 'camera'
    | 'close-popup'
    | 'close-popup-black'
    | 'sort-down'
    | 'plus'
    | 'phone'
    | 'email'
    | 'activity'
    | 'close-alert'
    | 'logout'
    | 'lock'
    | 'pencil'
    | 'bookmark'
    | 'bookmark-filled'
    | 'company-type'
    | 'social-facebook'
    | 'social-googleplus'
    | 'social-instagram'
    | 'social-linkedin'
    | 'social-pinterest'
    | 'social-tumblr'
    | 'social-twitter'
    | 'social-url'
    | 'social-vk'
    | 'social-youtube'
}

const Icon: SFC<IconProps> = ({ name, ...spanProps }) => <span styleName={name} {...spanProps}/>

export default CSSModules(Icon, require('./styles.css'))
