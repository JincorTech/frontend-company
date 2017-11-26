import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

export type EmailItemProps = HTMLProps<HTMLDivElement> & {
  email: string
};

const EmailItem: SFC<EmailItemProps> = ({ email, selected, ...divProps }) => (
  <div styleName={selected ? 'selected' : 'email-item'} {...divProps}>{email}</div>
);

export default CSSModules(EmailItem, require('../styles.css'));
