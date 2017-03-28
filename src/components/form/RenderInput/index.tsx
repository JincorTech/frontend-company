import * as React from 'react'
import { SFC } from 'react'
import { WrappedFieldProps } from 'redux-form'

import Input from '../../common/Input'

export type InputProps = WrappedFieldProps<any> & {
  type: 'text' | 'email'
  placeholder?: string
}


const RenderInput: SFC<InputProps> = (props) => {
  const { type, placeholder, input, meta } = props
  const { invalid, touched, active, dirty } = meta
  const hasError = touched && !active && invalid && dirty

  return <Input
    type={type}
    placeholder={placeholder}
    {...input}/>
}

export default RenderInput
