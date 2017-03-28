import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps } from 'redux-form'

import Textarea, { Props as TextareaProps } from './components/Textarea'


export type Props = WrappedFieldProps<any> & TextareaProps

const RenderTextarea: SFC<Props> = (props) => {
  const { placeholder, input, meta } = props
  const { invalid, touched, active, dirty } = meta

  return <Textarea
    invalid={touched && !active && invalid && dirty}
    placeholder={placeholder}
    {...input}/>
}

export default CSSModules(RenderTextarea, require('./styles.css'))