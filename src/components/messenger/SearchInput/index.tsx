import * as React from 'react';
import { SFC } from 'react';
import * as CSSModules from 'react-css-modules';

import Input, { Props as InputProps } from '../../common/Input';
import Icon from '../../common/Icon';

/**
 * Types
 */
export type Props = InputProps & JSX.IntrinsicClassAttributes<InputProps> & {
  onRemove?: any
};

/**
 * Component
 */
const SearchInput: SFC<Props> = (props) => (
  <div styleName="search">
    <Icon
      styleName="search-icon"
      name="search-light"/>

    <Input styleName="search-field" {...props}/>

    <Icon
      styleName="clear-value"
      name="remove"/>
  </div>
);

export default CSSModules(SearchInput, require('./styles.css'));
