import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

import Icon from '../Icon';

export type SelectInputProps = HTMLProps<HTMLDivElement> & {
  value?: string
  placeholder?: string
  invalid?: boolean
};

const SelectDropdown: SFC<SelectInputProps> = (props) => {
  const { value, placeholder, invalid, ...divProps } = props;

  return (
    <div styleName={invalid ? 'input-invalid' : 'input-default'} {...divProps}>
      {value || <span styleName={invalid ? 'placeholder-invalid' : 'placeholder-default'}>{placeholder}</span>}
      <Icon styleName="icon" name={invalid ? 'arrow-down-red' : 'arrow-down'}/>
    </div>
  );
};

SelectDropdown.defaultProps = {
  value: '',
  placeholder: '',
  invalid: false
};

export default CSSModules(SelectDropdown, require('./styles.css'));
