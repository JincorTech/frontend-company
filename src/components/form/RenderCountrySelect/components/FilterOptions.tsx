import * as React from 'react'
import { Component, FormEvent, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { Scrollbars } from 'react-custom-scrollbars'

import OptionItem, { Option } from './OptionItem'
import Input from '../../../common/Input'


export type FilterOptionsProps = HTMLProps<HTMLDivElement> & {
  options: Option[]
  onSelectOption: (value: Option) => void
}

export type FilterOptionsState = {
  searchValue: string
}

class FilterOptions extends Component<FilterOptionsProps, FilterOptionsState> {
  constructor(props) {
    super(props)

    this.state = {
      searchValue: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.filterOptions = this.filterOptions.bind(this)
  }

  private handleChange(e: FormEvent<HTMLInputElement>): void {
    this.setState({
      searchValue: e.currentTarget.value
    })
  }

  private filterOptions(option: Option): boolean {
    const regexp = new RegExp(this.state.searchValue, 'i')
    const name = typeof option === 'string' ? option : option.name

    return regexp.test( name)
  }

  public render(): JSX.Element {
    const { options, onSelectOption, ...divProps } = this.props
    const { searchValue } = this.state

    return (
      <div styleName="filter-options" {...divProps} onClick={(e) => e.stopPropagation()}>
        <div styleName="filter">
          <Input
            styleName="filter-input"
            autoFocus
            type="text"
            value={searchValue}
            onChange={this.handleChange}/>
        </div>
        <div styleName="options">
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMin={275}
            autoHeightMax={510}>
            {
              options
                .filter(this.filterOptions)
                .map((option, i) => <OptionItem key={i} option={option} onClick={() => onSelectOption(option)}/>)
            }
          </Scrollbars>
        </div>
      </div>
    )
  }
}

export default CSSModules(FilterOptions, require('../styles.css'))