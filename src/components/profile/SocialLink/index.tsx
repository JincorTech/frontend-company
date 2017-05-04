import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


export type Props = HTMLProps<HTMLLIElement> & LinkProps

export type LinkProps = {
  name: string
  value: string
  iconUrl?: string
  displayName?: boolean
  size?: number
}

const SocialLink: SFC<Props> = (props) => {
  const { name, iconUrl, value: url, displayName, size = 36, ...liProps } = props

  return (
    <li styleName="social-link" {...liProps}>
      <a styleName="link-icon" href={url} style={{ width: size, height: size }}>
        {iconUrl
          ? <img src={iconUrl}/>
          : <img src={require('./svg/default.svg')}/>}
      </a>
      {displayName && <span styleName="link-name">{name}</span>}
    </li>
  )
}

SocialLink.defaultProps = {
  displayName: true
}

export default CSSModules(SocialLink, require('./styles.css'))