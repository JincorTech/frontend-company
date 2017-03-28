import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


export type UserAvatarProps = HTMLProps<HTMLDivElement> & {
  src?: string
  alt?: string
}

const UserAvatar: SFC<UserAvatarProps> = (props) => {
  const { src, alt, ...divProps } = props

  return (
    <div styleName="user-avatar" {...divProps}>
      <img src={src} alt={alt}/>
    </div>
  )
}

export default CSSModules(UserAvatar, require('../styles.css'))