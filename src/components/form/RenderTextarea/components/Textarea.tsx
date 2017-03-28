import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import TextareaAutosize from 'react-textarea-autosize'


export type Props = {
  invalid?: boolean
  value?: string
  onChange?: (value: any) => void
  placeholder?: string
}

const Textarea: SFC<Props> = (props) => {
  const { invalid, ...textareaProps } = props

  return (
    <div styleName={invalid ? 'invalid' : 'default'}>
      <TextareaAutosize
        styleName="textarea"
        rows={3}
        {...textareaProps}/>
    </div>
  )
}

export default CSSModules(Textarea, require('../styles.css'))