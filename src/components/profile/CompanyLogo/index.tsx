import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

export type CompanyLogoProps = HTMLProps<HTMLDivElement> & {
  src?: string
  alt?: string
  borderRadius?: string
};

const CompanyLogo: SFC<CompanyLogoProps> = ({ src, alt, borderRadius = '4px', ...divProps }) => (
  <div styleName="company-logo" style={{ borderRadius }} {...divProps}>
    <div styleName={ src ? 'blackout' : 'blackout-empty' }/>
    {src ? <img src={src} alt={alt}/> : <div styleName="empty"/>}
  </div>
);

export default CSSModules(CompanyLogo, require('./styles.css'));
