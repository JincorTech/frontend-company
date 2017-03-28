import { createSelector } from 'reselect'
import { StateMap as State, Option } from '../../redux/modules/form/renderFilterSelect'

const optionsSelector = (state: State): Option[] => state.options
const getOptionFilter = (state: State): string => state.optionFilter

export const optionsFilterSelector = createSelector<State, Option[], Option[], string>(
  optionsSelector,
  getOptionFilter,
  (options, optionFilter) => options.filter((option) =>
    new RegExp(optionFilter, 'i').test(option.name)
  )
)