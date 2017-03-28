import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


export type Option = {
  name: string
  value: string
}

export type OptionProps = HTMLProps<HTMLDivElement> & {
  option: Option
  onClick: (option: Option) => void
}

const OptionItem: SFC<OptionProps> = ({ option, onClick }) => {
  return (
    <div styleName="option" onClick={() => onClick(option)}>
      <div styleName="option-value">{option.name}</div>
    </div>
  )
}

export default CSSModules(OptionItem, require('../styles.css'))