import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps } from 'redux-form'

import Select, { Props as SelectProps } from '../../common/Select'
import FieldError from '../../../components/common/FieldError'

/**
 * Types
 */
export type Props = SelectProps & WrappedFieldProps<any>

/**
 * Props
 */
const RenderSelect: SFC<Props> = (props) => {
  const { title, placeholder, input, meta, options, modalId, filter, Button } = props

  return (
    <FieldError meta={meta}>
      <Select
        modalId={modalId}
        filter={filter}
        title={placeholder}
        options={options}
        Button={Button}
        optionValue={input.value}
        onChange={input.onChange}
        onBlur={input.onBlur}
        placeholder={placeholder}/>
    </FieldError>
  )
}

/**
 * Decorators
 */
export default CSSModules(RenderSelect, require('./styles.css'))