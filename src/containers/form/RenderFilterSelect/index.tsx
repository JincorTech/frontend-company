import * as React from 'react'
import { SFC, HTMLProps } from 'react'
import * as CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { WrappedFieldProps } from 'redux-form'

import {
  openPopup,
  closePopup,
  changeFilter,
  setOptions,
  StateMap as StateProps
} from '../../../redux/modules/form/renderFilterSelect'
import { optionsFilterSelector } from '../../../selectors/form/renderFilterSelect'

import FilterSelect, { Props as SelectProps } from './components/FilterSelect'
import Error from '../../../components/form/Error'
import { Option } from './components/OptionItem'

/**
 * Type
 */
export type Props = FieldProps & StateProps & DispatchProps

export type DispatchProps = {
  openPopup: () => void
  closePopup: () => void
  changeFilter: (value: string) => void
  setOptions: (options: Option[]) => void
}

export type FieldProps = SelectProps & WrappedFieldProps<any>

/**
 * Component
 */
const RenderFilterSelect: SFC<Props> = (props) => {
  const {
    open,
    optionFilter,
    openPopup,
    closePopup,
    changeFilter,
    setOptions,
    placeholder,
    input,
    meta,
    options,
    selectOptions
  } = props

  const { invalid, touched, active, dirty, error } = meta
  const hasError = touched && !active && invalid && dirty

  return (
    <div styleName="render-filter-select">
      {hasError && <Error styleName="error" msg={error}/>}

      <FilterSelect
        open={open}
        optionFilter={optionFilter}
        options={options}
        selectOptions={selectOptions}
        placeholder={placeholder}
        invalid={hasError}
        openPopup={openPopup}
        closePopup={closePopup}
        changeFilter={changeFilter}
        setOptions={setOptions}
        {...input}/>
    </div>
  )
}

const StyledComponent = CSSModules(RenderFilterSelect, require('./styles.css'))

export default connect<StateProps, DispatchProps, FieldProps>(
  ({ formFields: { renderFilterSelect } }) => ({
    ...renderFilterSelect,
    options: optionsFilterSelector(renderFilterSelect)
  }),
  { openPopup, closePopup, changeFilter, setOptions }
)(StyledComponent)