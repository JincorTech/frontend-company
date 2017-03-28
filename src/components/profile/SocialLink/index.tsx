import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


export type Props = HTMLProps<HTMLLIElement> & SocialLinkProps

export type SocialLinkProps = {
  iconUrl?: string
  name?: string
  hideName?: boolean
  url: string
}

const SocialLink: SFC<Props> = (props) => {
  const { name, iconUrl, url, hideName, ...liProps } = props

  return (
    <li styleName="social-link" {...liProps}>
      <a styleName="link-icon" href={url}>
        {iconUrl
          ? <img src={iconUrl}/>
          : <img src={require('./svg/default.svg')}/>}
      </a>
      {!hideName && <span styleName="link-name">{name}</span>}
    </li>
  )
}

SocialLink.defaultProps = {
  hideName: false
}

export default CSSModules(SocialLink, require('./styles.css'))