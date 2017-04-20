import * as React from 'react'
import { SFC } from 'react'
import { WrappedFieldProps } from 'redux-form'
import * as CSSModules from 'react-css-modules'

import Input from '../../../components/common/Input'


export type InputProps = WrappedFieldProps<any> & {
  placeholder?: string
}


const RenderInput: SFC<InputProps> = (props) => {
  const { placeholder, input, meta, ...inputProps } = props

  return (
    <div>
      <Input
        styleName="search"
        type="text"
        placeholder={placeholder}
        {...input}
        {...inputProps}/>
    </div>
  )
}

export default CSSModules(RenderInput, require('./styles.css'))