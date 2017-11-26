import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

import Icon from '../../../components/common/Icon';

export type Props = HTMLProps<HTMLDivElement> & ContactItemProps;

export type ContactItemProps = {
  type: 'email' | 'phone' | 'activity'
  value: string
};

const ContactItem: SFC<Props> = (props) => {
  const { type, value, ...divProps } = props;

  return (
    <div styleName="contact-item" {...divProps}>
      {type && <Icon styleName="contact-icon" name={type} />}
      <span styleName="contact-value">{value}</span>
    </div>
  );
};

export default CSSModules(ContactItem, require('./styles.css'));
