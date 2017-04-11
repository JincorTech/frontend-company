import { createSelector } from 'reselect'
import { SelectState as State } from '../../redux/modules/common/select'

const stateSelector = (state: State): State => state

export const optionsSelector = createSelector<State, string[], State>(
  stateSelector,
  ({ options, filterValue, optionsMap }) => options.filter((optionValue) =>
    new RegExp(filterValue, 'i').test(optionsMap[optionValue].name)
  )
)