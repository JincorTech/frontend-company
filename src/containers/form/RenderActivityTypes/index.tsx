import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps } from 'redux-form'

import ActivityTypes, { Props as ActivityTypesProps } from '../../common/ActivityTypes'
import FieldError from '../../../components/common/FieldError'

/**
 * Types
 */
export type Props = ActivityTypesProps & WrappedFieldProps<any>

/**
 * Props
 */
const RenderActivityTypes: SFC<any> = (props) => {
  const { title, placeholder, input, meta, modalId, Button } = props

  return (
    <FieldError meta={meta}>
      <ActivityTypes
        modalId={modalId}
        Button={Button}
        title={placeholder}
        activityValue={input.value}
        placeholder={placeholder}/>
    </FieldError>
  )
}

/**
 * Decorators
 */
export default CSSModules(RenderActivityTypes, require('./styles.css'))