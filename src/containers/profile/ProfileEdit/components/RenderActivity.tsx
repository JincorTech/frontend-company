import * as React from 'react'
import { SFC } from 'react'
import * as CSSModules from 'react-css-modules'
import { InjectedCSSModuleProps } from 'react-css-modules'
import { WrappedFieldProps } from 'redux-form'
import { connect } from 'react-redux'

import FieldError from '../../../../components/common/FieldError'
import ActivityTypes from '../../../common/ActivityTypes'
import SelectInput from '../../../../components/common/SelectInput'

/**
 * Render activity field
 */
export type Props = WrappedFieldProps<any> & InjectedCSSModuleProps & {
  open: boolean
  index: number
  placeholder: string
  openPopup: () => void
  closePopup: () => void
  handleRemove: () => void
}

export const RenderActivity: SFC<Props> = (props) => {
  const {
    placeholder,
    input,
    meta,
    index,
    handleRemove,
    styles,
    ...inputProps
  } = props

  const { invalid, touched, active, dirty, error } = meta
  const { value, onChange } = input
  const hasError = touched && !active && invalid && dirty
  const button = <SelectInput className={styles['select-input']}/>

  return (
    <div styleName="render-activity">
      <FieldError meta={meta}>
        <ActivityTypes
          button={button}
          title="Основная сфера деятельности"
          name={`profile-edit-at-${index}`}
          activityValue={value}
          placeholder={placeholder}
          {...inputProps}/>
      </FieldError>

      <a styleName="activity-remove" onClick={handleRemove}>удалить</a>
    </div>
  )
}

export default CSSModules(RenderActivity, require('../styles.css'))