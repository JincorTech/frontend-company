import * as React from 'react'
import { SFC, cloneElement } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'

import { openPopup, closePopup, StateMap as StateProps } from '../../../../redux/modules/form/renderSelect'

import OptionItem, { Option } from './OptionItem'
import SelectInput from '../../../../components/common/SelectInput'
import Popup from '../../../../components/common/Popup'

/**
 * Types
 */
export type Props = ComponentProps & StateProps & DispatchProps

export type ComponentProps = {
  options: Option[]
  optionValue: Option
  onChange: (value: any) => void
  onBlur: (e?: any) => void
  title: string
  placeholder?: string
  invalid?: boolean
}

export type DispatchProps = {
  openPopup: () => void
  closePopup: () => void
}


/**
 * Component
 */
const CountrySelect: SFC<Props> = (props) => {
  const {
    open,
    optionValue,
    placeholder,
    invalid,
    options,
    title,
    openPopup,
    closePopup,
    onChange,
    onBlur
  } = props

  const handleChange = (option: Option): void => {
    closePopup()
    onChange(option)
    onBlur()
  }

  return (
    <div styleName="select">
      <SelectInput
        value={optionValue.name}
        placeholder={placeholder}
        invalid={invalid}
        onClick={openPopup}/>

      <Popup modalId="select-popup" styleName="select-popup" open={open} onClose={closePopup}>
        <h4 styleName="popup-title">{title}</h4>

        <div styleName="select-options">
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMin={275}
            autoHeightMax={553}>
            {options.map((option, i) => (
              <OptionItem
                key={i}
                option={option}
                onClick={() => handleChange(option)}/>
            ))}
          </Scrollbars>
        </div>
      </Popup>
    </div>
  )
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(CountrySelect, require('../styles.css'))

export default connect<StateProps, DispatchProps, ComponentProps>(
  (state) => state.formFields.renderSelect,
  { openPopup, closePopup }
)(StyledComponent)