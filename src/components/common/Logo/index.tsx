import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';
import { Link, LinkProps } from 'react-router';

export type LogoProps = HTMLProps<HTMLAnchorElement> & LinkProps;

const Logo: SFC<LogoProps> = (props) => {
  return (
    <Link styleName="logo" {...props}/>
  );
};

export default CSSModules(Logo, require('./styles.css'));
