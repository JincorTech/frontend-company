import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps } from 'redux-form'

import LinkInput from './LinkInput'


export type InputProps = WrappedFieldProps<any> & {
  placeholder?: string
  onRemove: () => void
}

const RenderLinkInput: SFC<InputProps> = (props) => {
  const { placeholder, input, meta, onRemove } = props
  const { invalid, touched, active, dirty } = meta
  const hasError = touched && !active && invalid && dirty

  return <LinkInput
    invalid={hasError}
    placeholder={placeholder}
    onRemove={onRemove}
    {...input}/>
}

export default CSSModules(RenderLinkInput, require('../styles.css'))
