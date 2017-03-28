import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


export type CompanyLogoProps = HTMLProps<HTMLDivElement> & {
  src?: string
  alt?: string
}

const CompanyLogoEdit: SFC<CompanyLogoProps> = (props) => {
  const { src, alt, ...divProps } = props

  return (
    <div styleName="company-logo-edit" {...divProps}>
      <div styleName="company-logo">
        <img src={src} alt={alt}/>
      </div>

      <div styleName="company-logo-overlay">
        <div styleName="camera"/>
      </div>
    </div>
  )
}

export default CSSModules(CompanyLogoEdit, require('./styles.css'))