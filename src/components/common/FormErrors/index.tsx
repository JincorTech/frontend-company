import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'


/**
 * Types
 */
export type Props = HTMLProps<HTMLDivElement> & {
  errors?: any
}

/**
 * Component
 */
const FormErrors: SFC<Props> = ({ errors }) => (
  errors && <div styleName="form-errors">
    <ul>
      {Object.keys(errors).map((fieldName) => (
        <li key={fieldName}>{errors[fieldName]}</li>
      ))}
    </ul>
  </div>
)

export default CSSModules(FormErrors, require('./styles.css'))