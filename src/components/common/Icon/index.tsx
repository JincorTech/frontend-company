import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = HTMLProps<HTMLSpanElement> & {
  name: string
};
/**
 * Component
 */
const Icon: SFC<Props> = ({ name, ...spanProps }) => (
  <span styleName={name} {...spanProps}/>
);

export default CSSModules(Icon, require('./styles.css'));
