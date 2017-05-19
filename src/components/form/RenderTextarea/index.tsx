import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import { WrappedFieldProps } from 'redux-form'

import Textarea, { Props as TextareaProps } from '../../profile/DescriptionTextarea'
import FieldError from '../../common/FieldError'


export type Props = WrappedFieldProps<any> & TextareaProps

const RenderTextarea: SFC<Props> = (props) => {
  const { placeholder, input, meta, maxLength } = props

  return (
    <FieldError meta={meta}>
      <Textarea
        placeholder={placeholder}
        maxLength={maxLength}
        {...input}/>
    </FieldError>
  )
}

export default RenderTextarea