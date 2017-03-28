import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

/**
 * Types
 */
export type Option = {
  name: string
  value: string
}

export type OptionProps = HTMLProps<HTMLDivElement> & {
  option: Option
  onSelectOption: (option: Option) => void
}

/**
 * Component
 */
const OptionItem: SFC<OptionProps> = ({ option, onSelectOption }) => {
  return (
    <div styleName="option" onClick={() => onSelectOption(option)}>
      <div styleName="option-value">{option.name}</div>
    </div>
  )
}

export default CSSModules(OptionItem, require('../styles.css'))