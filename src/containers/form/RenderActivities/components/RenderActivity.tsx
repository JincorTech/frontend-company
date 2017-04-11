import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { WrappedFieldProps } from 'redux-form'
import { connect } from 'react-redux'

import FieldError from '../../../../components/common/FieldError'
import ActivityTypes from './ActivityTypes'

/**
 * Render activity field
 */
export type Props = WrappedFieldProps<any> & {
  open: boolean
  placeholder: string
  openPopup: () => void
  closePopup: () => void
  handleRemove: () => void
}

export const RenderActivity: SFC<Props> = (props) => {
  const {
    open,
    placeholder,
    openPopup,
    closePopup,
    input,
    meta,
    handleRemove
  } = props

  const { invalid, touched, active, dirty, error } = meta
  const { value, onChange } = input
  const hasError = touched && !active && invalid && dirty

  return (
    <div styleName="render-activity">
      <FieldError meta={meta}>
        <ActivityTypes
          open={open}
          invalid={hasError}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          openPopup={openPopup}
          closePopup={closePopup}/>
      </FieldError>

      <a styleName="activity-remove" onClick={handleRemove}>удалить</a>
    </div>
  )
}

export default CSSModules(RenderActivity, require('../styles.css'))