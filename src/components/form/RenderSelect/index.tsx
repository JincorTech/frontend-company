import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps } from 'redux-form'

import Select, { Props as SelectProps } from './components/Select'
import Error from '../Error'


export type RenderSelectProps = SelectProps & WrappedFieldProps<any>

const RenderFilterSelect: SFC<RenderSelectProps> = (props) => {
  const { placeholder, input, meta, options } = props
  const { invalid, touched, active, dirty, error } = meta
  const hasError = touched && !active && invalid && dirty

  return (
    <div>
      {hasError && <Error msg={error}/>}

      <Select
        options={options}
        placeholder={placeholder}
        invalid={hasError}
        {...input}/>
    </div>
  )
}

export default CSSModules(RenderFilterSelect, require('./styles.css'))