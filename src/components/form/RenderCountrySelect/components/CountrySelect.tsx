import * as React from 'react'
import { Component, cloneElement } from 'react'
import * as CSSModules from 'react-css-modules'

import FilterOptions from './FilterOptions'
import SelectInput from '../../../common/SelectInput'
import Popup from '../../../common/Popup'


export type CountrySelectProps = {
  options: Option[]
  placeholder?: string
  value?: Option
  onChange?: (value: any) => void
  invalid?: boolean
}

export type Option = {
  value: string
  name: string
}

export type CountrySelectState = {
  open: boolean
}


class CountrySelect extends Component<CountrySelectProps, CountrySelectState> {
  public static defaultProps = {
    onChange: () => {}
  }

  public state: CountrySelectState = {
    open: false
  }

  constructor(props) {
    super(props)

    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  private handleOpen(): void {
    this.setState({ open: true })
  }

  private handleClose(): void {
    this.setState({ open: false })
  }

  private handleChange(value: Option): void {
    this.props.onChange(value)

    this.setState({ open: false })
  }

  public render(): JSX.Element {
    const { open } = this.state
    const { value, placeholder, invalid, options } = this.props

    return (
      <div styleName="select">
        <SelectInput
          value={value.name}
          placeholder={placeholder}
          invalid={invalid}
          onClick={this.handleOpen}/>

        <Popup styleName="select-popup" open={open} onClose={this.handleClose}>
          <h4 styleName="popup-title">Тип компании</h4>

          <FilterOptions
            options={options}
            onSelectOption={this.handleChange}/>
        </Popup>
      </div>
    )
  }
}

export default CSSModules(CountrySelect, require('../styles.css'))