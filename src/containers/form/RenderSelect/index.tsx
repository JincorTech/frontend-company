import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps } from 'redux-form'

import Select, { Props as SelectProps } from '../../common/Select'
import Error from '../../../components/form/Error'

/**
 * Types
 */
export type Props = SelectProps & WrappedFieldProps<any>

/**
 * Props
 */
const RenderSelect: SFC<Props> = (props) => {
  const { title, placeholder, input, meta, options, modalId, filter } = props
  const { invalid, touched, active, dirty, error } = meta
  const hasError = touched && !active && invalid && dirty

  return (
    <div styleName="render-select">
      {hasError && <Error styleName="error" msg={error}/>}

      <Select
        modalId={modalId}
        filter={filter}
        title={placeholder}
        options={options}
        optionValue={input.value}
        onChange={input.onChange}
        onBlur={input.onBlur}
        placeholder={placeholder}
        invalid={hasError}/>
    </div>
  )
}

/**
 * Decorators
 */
export default CSSModules(RenderSelect, require('./styles.css'))