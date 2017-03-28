import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps } from 'redux-form'

import Select, { Props as SelectProps } from './components/Select'
import Error from '../../../components/form/Error'


export type RenderSelectProps = SelectProps & WrappedFieldProps<any>

const RenderFilterSelect: SFC<RenderSelectProps> = (props) => {
  const { title, placeholder, input, meta, options } = props
  const { invalid, touched, active, dirty, error } = meta
  const hasError = touched && !active && invalid && dirty
return (
    <div>
      {hasError && <Error msg={error}/>}

      <Select
        title={placeholder}
        options={options}
        optionValue={input.value}
        onChange={input.onChange}
        onBlur={input.onBlur}
        placeholder={placeholder}
        invalid={hasError}/>
    </div>
  )
}

export default CSSModules(RenderFilterSelect, require('./styles.css'))