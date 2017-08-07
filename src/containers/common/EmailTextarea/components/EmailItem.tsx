import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

export type Props = HTMLProps<HTMLDivElement> & {
  email: string
};

const EmailItem: SFC<Props> = ({ email, selected, ...divProps }) => (
  <div
    styleName={selected ? 'selected' : 'email-item'}
    children={email}
    {...divProps}/>
);

export default CSSModules(EmailItem, require('../styles.css'));
