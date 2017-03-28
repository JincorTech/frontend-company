import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps } from 'redux-form'

import CountrySelect, { CountrySelectProps } from './components/CountrySelect'


export type RenderSelectProps = CountrySelectProps & WrappedFieldProps<any>

const RenderFilterSelect: SFC<RenderSelectProps> = (props) => {
  const { placeholder, input, meta, options } = props
  const { invalid, touched, active, dirty } = meta

  return <CountrySelect
          options={options}
          placeholder={placeholder}
          invalid={touched && !active && invalid && dirty}
          {...input}/>
}

export default CSSModules(RenderFilterSelect, require('./styles.css'))