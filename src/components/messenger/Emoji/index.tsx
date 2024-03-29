import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = HTMLProps<HTMLImageElement> & {
  name: string
  small?: boolean
};

const Emoji: SFC<Props> = ({ name, small, ...imgProps }) => (
  <img
    styleName={small ? 'small' : 'default'}
    src={require(`./img/${name}.png`)}
    alt={name}
    title={name}
    {...imgProps}/>
);

Emoji.defaultProps = {
  small: false
};

export default CSSModules(Emoji, require('./styles.css'));
