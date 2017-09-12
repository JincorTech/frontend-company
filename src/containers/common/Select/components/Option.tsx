import * as React from 'react';
import { SFC, HTMLProps } from 'react';
import * as CSSModules from 'react-css-modules';

/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & {
  option: OptionItem
  onSelectOption: (optionValue: string) => void
};

export type OptionItem = {
  name: string
  value: string
};

/**
 * Component
 */
const Option: SFC<Props> = ({ option, onSelectOption }) => {
  return (
    <div styleName="option" onClick={() => onSelectOption(option.value)}>
      <div styleName="option-value">{option.name}</div>
    </div>
  );
};

/**
 * Decorators
 */
export default CSSModules(Option, require('../styles.css'));
