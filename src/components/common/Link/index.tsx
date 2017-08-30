import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';
import { Link, LinkProps as LProps } from 'react-router';

export type LinkProps = LProps & {
  withBorder?: boolean
};

const CustomLink: SFC<LinkProps> = ({ withBorder, ...linkProps}) => (
  <Link
    styleName={withBorder ? 'bordered' : 'default'}
   {...linkProps}/>
);

export default CSSModules(CustomLink, require('./styles.css'));
