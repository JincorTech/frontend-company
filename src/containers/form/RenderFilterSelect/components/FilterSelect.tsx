import * as React from 'react'
import { Component } from 'react'
import * as CSSModules from 'react-css-modules'
import { Scrollbars } from 'react-custom-scrollbars'
import * as shallowequal from 'shallowequal'

import Input from '../../../../components/common/Input'
import SelectInput from '../../../../components/common/SelectInput'
import Popup from '../../../../components/common/Popup'
import OptionItem, { Option } from './OptionItem'

/**
 * Types
 */
export type Props = {
  open: boolean
  value: Option
  placeholder: string
  options: Option[]
  selectOptions: Option[]
  optionFilter: string
  invalid: boolean
  onChange: (value: any) => void
  openPopup: () => void
  closePopup: () => void
  changeFilter: (value: string) => void
  setOptions: (options: Option[]) => void
}

/**
 * Component
 */
class CountrySelect extends Component<Props, {}> {
  constructor(props) {
    super(props)

    props.setOptions(props.selectOptions)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  public componentWillReceiveProps(nextProps: Props): void {
    if (!shallowequal(this.props.selectOptions, nextProps.selectOptions)) {
      this.props.setOptions(nextProps.selectOptions)
    }
  }

  private handleSelect(option: Option): void {
    this.props.onChange(option)
    this.props.closePopup()
  }

  private handleInputChange(event: any): void {
    this.props.changeFilter(event.target.value)
  }

  public render(): JSX.Element {
    const {
      open,
      value,
      placeholder,
      options,
      invalid,
      optionFilter,
      openPopup,
      closePopup,
      changeFilter
    } = this.props

    return (
      <div styleName="select">
        <SelectInput
          value={value.name}
          placeholder={placeholder}
          invalid={invalid}
          onClick={openPopup}/>

        <Popup styleName="select-popup" open={open} onClose={closePopup}>
          <h4 styleName="popup-title">Тип компании</h4>

          <div styleName="filter">
            <Input
              styleName="filter-input"
              autoFocus
              type="text"
              value={optionFilter}
              onChange={this.handleInputChange}/>
          </div>

          <div styleName="select-options">
            <Scrollbars
              autoHide
              autoHeight
              autoHeightMin={275}
              autoHeightMax={496}>
              {options.map((option, i) => (
                <OptionItem
                  key={i}
                  option={option}
                  onSelectOption={this.handleSelect}/>
              ))}
            </Scrollbars>
          </div>
        </Popup>
      </div>
    )
  }
}

export default CSSModules(CountrySelect, require('../styles.css'))