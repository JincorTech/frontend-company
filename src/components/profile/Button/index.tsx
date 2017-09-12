import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = HTMLProps<HTMLButtonElement>;

const Button: SFC<Props> = (props) => {
  return <button styleName="button" {...props}/>;
};

export default CSSModules(Button, require('./styles.css'));
