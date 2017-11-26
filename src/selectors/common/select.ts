import { createSelector } from 'reselect';
import { SelectState as State } from '../../redux/modules/common/select';

const stateSelector = (state: State): State => state;

export const optionsSelector = createSelector<State, string[], State>(
  stateSelector,
  ({ options, filterValue, optionsMap }) => {
    const regExp = new RegExp(`^${filterValue}`, 'i');

    return options.filter((optionValue) => regExp.test(optionsMap[optionValue].name));
  }
);
