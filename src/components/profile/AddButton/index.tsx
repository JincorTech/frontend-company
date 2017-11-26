import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

import Icon from '../../common/Icon';

export type Props = HTMLProps<HTMLDivElement>;

const AddButton: SFC<Props> = ({children, ...props}) => {
  return (
    <div styleName="add-input" {...props}>
      <Icon styleName="add-icon" name="plus"/>
      <span styleName="add-link">{children}</span>
    </div>
  );
};

export default CSSModules(AddButton, require('./styles.css'));
