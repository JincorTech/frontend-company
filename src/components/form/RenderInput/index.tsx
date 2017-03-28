import * as React from 'react'
import { SFC } from 'react'
import { WrappedFieldProps } from 'redux-form'

import Input from '../../common/Input'
import Error from '../Error'

export type InputProps = WrappedFieldProps<any> & {
  type: 'text' | 'email'
  placeholder?: string
}


const RenderInput: SFC<InputProps> = (props) => {
  const { type, placeholder, input, meta } = props
  const { invalid, touched, active, dirty, error } = meta
  const hasError = touched && !active && invalid && dirty

  return (
    <div>
      {hasError && <Error msg={error}/>}

      <Input
        type={type}
        placeholder={placeholder}
        invalid={hasError}
        {...input}/>
    </div>
  )
}

export default RenderInput
