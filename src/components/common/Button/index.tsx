import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

import Spinner from '../Spinner';

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  spinner?: boolean
  bStyle?: 'default' | 'outline'
};

const Button: SFC<ButtonProps> = (props) => {
  const {spinner, disabled, children, bStyle = 'default', ...btnProps} = props;

  return (
    <button
      styleName={spinner ? `${bStyle}-loaded` : bStyle}
      disabled={spinner || disabled}
      {...btnProps}>
      {spinner ? <Spinner /> : children}
    </button>
  );
};

export default CSSModules(Button, require('./styles.css'));
