import * as React from 'react'
import { SFC } from 'react'
import { WrappedFieldProps } from 'redux-form'

import Password, { PasswordProps } from './components/Password'


export type ControlPasswordProps = PasswordProps & WrappedFieldProps<any>

const ControlPassword: SFC<ControlPasswordProps> = (props) => {
  const { visible, onChangeVisibility, placeholder, input, meta } = props
  const { invalid, touched, active, dirty } = meta
  const hasErrors = invalid && touched && !active && dirty

  return <Password
    invalid={hasErrors}
    visible={visible}
    placeholder={placeholder}
    onChangeVisibility={onChangeVisibility}
    {...input}/>
}

export default ControlPassword
