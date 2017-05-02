import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


export type CompanyLogoProps = HTMLProps<HTMLDivElement> & {
  src?: string
  alt?: string
}

const CompanyLogo: SFC<CompanyLogoProps> = (props) => {
  const { src, alt, ...divProps } = props

  return (
    <div styleName="company-logo" {...divProps}>
      {src ? <img src={src} alt={alt}/> : <div styleName="empty"/>}
    </div>
  )
}

export default CSSModules(CompanyLogo, require('./styles.css'))