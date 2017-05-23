import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps } from 'redux-form'

import Select, { Props as SelectProps } from '../../common/Select'
import FieldError from '../../../components/common/FieldError'

/**
 * Types
 */
export type Props = SelectProps & WrappedFieldProps<any> & {
  onOptionSelect: (value: string) => void
}

/**
 * Props
 */
const RenderSelect: SFC<Props> = (props) => {
  const { title, onOptionSelect, placeholder, input, meta, options, modalId, filter, button, select, actions, ...divProps } = props

  const handleChange = (value: any) => {
    input.onChange(value)
    onOptionSelect(value)
  }

  return (
    <FieldError meta={meta}>
      <Select
        modalId={modalId}
        filter={filter}
        title={placeholder}
        options={options}
        button={button}
        optionValue={input.value}
        onChange={handleChange}
        onBlur={input.onBlur}
        placeholder={placeholder}
        {...divProps}/>
    </FieldError>
  )
}

RenderSelect.defaultProps = {
  onOptionSelect: () => {}
}

/**
 * Decorators
 */
export default CSSModules(RenderSelect, require('./styles.css'))
