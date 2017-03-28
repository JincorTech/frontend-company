import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps } from 'redux-form'

import Textarea, { Props as TextareaProps } from './components/Textarea'
import Error from '../Error'


export type Props = WrappedFieldProps<any> & TextareaProps

const RenderTextarea: SFC<Props> = (props) => {
  const { placeholder, input, meta } = props
  const { invalid, touched, active, dirty, error } = meta
  const hasError = touched && !active && invalid && dirty

  return (
    <div>
      {hasError && <Error msg={error}/>}

      <Textarea
        invalid={hasError}
        placeholder={placeholder}
        {...input}/>
    </div>
    )
}

export default CSSModules(RenderTextarea, require('./styles.css'))