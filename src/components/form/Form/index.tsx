import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'

type FormProps = HTMLProps<HTMLFontElement> & {
  title: string
  hint?: string
}

const Form = (props) => {
  const { title, hint, className, children, ...formProps } = props

  return (
    <div styleName="form-wrap" className={className}>
      <h2 styleName={hint ? 'form-title' : 'without-hint'}>{title}</h2>
      {hint && <p styleName="form-hint">{hint}</p>}

      <form styleName="form" {...formProps}>
        {children}
      </form>
    </div>
  )
}

export default CSSModules(Form, require('./styles.css'))