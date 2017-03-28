import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps } from 'redux-form'

import Select, { Props as SelectProps } from './components/Select'


export type RenderSelectProps = SelectProps & WrappedFieldProps<any>

const RenderFilterSelect: SFC<RenderSelectProps> = (props) => {
  const { title, placeholder, input, meta, options } = props
  const { invalid, touched, active, dirty } = meta

  return <Select
    title={placeholder}
    options={options}
    optionValue={input.value}
    onChange={input.onChange}
    onBlur={input.onBlur}
    placeholder={placeholder}
    invalid={touched && !active && invalid && dirty}/>
}

export default CSSModules(RenderFilterSelect, require('./styles.css'))