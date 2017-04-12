import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps } from 'redux-form'

import Textarea, { Props as TextareaProps } from './components/Textarea'
import FieldError from '../../common/FieldError'


export type Props = WrappedFieldProps<any> & TextareaProps

const RenderTextarea: SFC<Props> = (props) => {
  const { placeholder, input, meta } = props

  return (
    <FieldError meta={meta}>
      <Textarea
        placeholder={placeholder}
        {...input}/>
    </FieldError>
  )
}

export default CSSModules(RenderTextarea, require('./styles.css'))