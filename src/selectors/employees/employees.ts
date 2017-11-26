import { createSelector } from 'reselect';
import { StateObj as State, ActiveEmployee } from '../../redux/modules/employees/employees';

const employeesSelector = (state: State): ActiveEmployee[] => state.active;

const comparator = (x, y) => {
  const role = (r) => r === 'company-admin' ? 10 : 2;

  const X = role(x.profile.role);
  const Y = role(y.profile.role);

  if (X < Y) return 1;
  if (X > Y) return -1;
  return 0;
};

export const activeSortSelector = createSelector<State, ActiveEmployee[], ActiveEmployee[]>(
  employeesSelector,
  employees => Array.from(employees).sort(comparator)
);
