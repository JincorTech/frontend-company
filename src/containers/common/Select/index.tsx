import * as React from 'react'
import { Component, cloneElement } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Scrollbars } from 'react-custom-scrollbars'
import * as shallowequal from 'shallowequal'

import {
  openSelect,
  closeSelect,
  registerSelect,
  registerFilter,
  removeSelect,
  setOptions,
  selectOption,
  setOption,
  changeFilter,
  StateMap,
  SelectState
} from '../../../redux/modules/common/select'

import { optionsSelector } from '../../../selectors/common/select'

import Option, { OptionItem } from './components/Option'
import SelectInput from '../../../components/common/SelectInput'
import Popup from '../../../components/common/Popup'
import Input from '../../../components/common/Input'


/**
 * Types
 */
export type Props = ComponentProps & StateProps & DispatchProps

export type ComponentProps = {
  modalId: string
  options: OptionItem[]
  optionValue: string
  title: string
  placeholder?: string
  invalid?: boolean
  filter: boolean
  button?: JSX.Element
  onChange: (e?: any) => void
  onBlur: (e?: any) => void
}

export type DispatchProps = {
  actions: {
    openSelect: () => void
    closeSelect: () => void
    selectOption: (value: string) => void
    registerSelect: () => void
    registerFilter: () => void
    removeSelect: () => void
    setOptions: (options: OptionItem[]) => void
    setOption: (optionValue: string) => void
    changeFilter: (value: string) => void
  }
}

export type StateProps = {
  select: SelectState
}

/**
 * Component
 */
class Select extends Component<Props, {}> {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  public static defaultProps: any = {
    select: {
      name: '',
      open: false,
      selectedOption: null,
      options: [],
      optionsMap: {}
    }
  }

  public componentWillMount(): void {
    const { modalId, filter, options, actions } = this.props
    const { setOptions, registerSelect, registerFilter } = actions
    if (!modalId) throw new Error('modalId parameter is required!')

    if (filter) {
      registerFilter()
    } else {
      registerSelect()
    }

    if (options) {
      setOptions(options)
    }
  }

  public componentWillUnmount(): void {
    const { removeSelect } = this.props.actions

    removeSelect()
  }

  public componentWillReceiveProps({ options: newOptions }: Props): void {
    const { options, optionValue, select, actions } = this.props
    const { setOptions, setOption } = actions

    if (!shallowequal(options, newOptions)) {
      setOptions(newOptions)
    }

    if (optionValue !== select.selectedOption) {
      setOption(optionValue)
    }
  }

  private handleInputChange(event: any): void {
    const { changeFilter } = this.props.actions
    changeFilter(event.target.value)
  }

  private handleSelect(value: string): void {
    const { onChange, actions: { selectOption }} = this.props
    onChange(value)
    selectOption(value)
  }

  public render(): JSX.Element {
    const { filter, modalId, button, select, title, placeholder, invalid, actions, options, optionValue, ...divProps } = this.props
    const { open, selectedOption, optionsMap, filterValue } = select
    const option = optionsMap[selectedOption] || { name: '', value: '' }

    return (
      <div styleName="select">
        {
          button
          ? cloneElement(button, {
              value: option.name,
              placeholder,
              onClick: actions.openSelect
            })
          : <SelectInput
              value={option.name}
              placeholder={placeholder}
              onClick={actions.openSelect}/>
        }

        <Popup modalId={modalId} styleName="select-popup" open={open} onClose={actions.closeSelect}>
          <h4 styleName="popup-title">{title}</h4>

          {filter && <div styleName="filter">
            <Input
              styleName="filter-input"
              autoFocus
              type="text"
              value={filterValue}
              onChange={this.handleInputChange}/>
          </div>}

          <div styleName="select-options">
            <Scrollbars
              autoHide
              autoHeight
              autoHeightMin={275}
              autoHeightMax={553}>
              {select.options.map((optionValue, i) => (
                <Option
                  key={i}
                  option={optionsMap[optionValue]}
                  onSelectOption={this.handleSelect}/>
              ))}
            </Scrollbars>
          </div>
        </Popup>
      </div>
    )
  }
}

/**
 * Decorators
 */
const StyledComponent = CSSModules(Select, require('./styles.css'))

const defaultSelect = {
  name: '',
  open: false,
  selectedOption: null,
  options: [],
  optionsMap: {},
  hasFilter: false
}

function mapStateToProps({ common: { select }}, { modalId }: Props): StateProps {
  const selectState = select[modalId] || defaultSelect
  const options = selectState.hasFilter
    ? optionsSelector(selectState)
    : selectState.options

  return {
    select:  { ...selectState, options}
  }
}

function mapDispatchToProps(dispatch, { modalId }: Props): DispatchProps {
  return {
    actions: bindActionCreators({
      openSelect: openSelect.bind(null, modalId),
      closeSelect: closeSelect.bind(null, modalId),
      setOptions: setOptions.bind(null, modalId),
      selectOption: selectOption.bind(null, modalId),
      removeSelect: removeSelect.bind(null, modalId),
      registerSelect: registerSelect.bind(null, modalId),
      registerFilter: registerFilter.bind(null, modalId),
      setOption: setOption.bind(null, modalId),
      changeFilter: changeFilter.bind(null, modalId)
    }, dispatch)
  }
}

export default connect<StateProps, DispatchProps, ComponentProps>(
  mapStateToProps,
  mapDispatchToProps
)(StyledComponent)
