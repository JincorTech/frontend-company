import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import TextareaAutosize from 'react-textarea-autosize'


export type Props = {
  invalid?: boolean
  value?: string
  onChange?: (value: any) => void
  placeholder?: string
  maxLength?: number
}

const Textarea: SFC<Props> = (props) => {
  const { invalid, maxLength, value, onChange, ...textareaProps } = props
  const length = value.length ? value.length : 0
  const handleDescriptionChange = (e: any) =>
    onChange(maxLength ? e.target.value.substr(0, maxLength) : e.target.value)

  return (
    <div styleName="wrapper">
      <div styleName={invalid ? 'invalid' : 'default'}>
        <TextareaAutosize
          styleName="textarea"
          rows={3}
          onChange={handleDescriptionChange}
          value={value}
          {...textareaProps}/>
      </div>
      {maxLength && <div styleName="counter">{length}/{maxLength}</div>}
    </div>
  )
}

export default CSSModules(Textarea, require('../styles.css'))