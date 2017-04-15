import { createSelector } from 'reselect'
import { StateObj as State, Employee } from '../../redux/modules/employees/employees'

const employeesSelector = (state: State): Employee[] => state.employees.list

export const activeEmployeesSelector = createSelector<State, Employee[], Employee[]>(
  employeesSelector,
  employees => employees.filter(employee => employee.meta.status === 'active')
)

export const invitedEmployeesSelector = createSelector<State, Employee[], Employee[]>(
  employeesSelector,
  employees => employees.filter(employee => employee.meta.status === 'invited')
)

export const deletedEmployeesSelector = createSelector<State, Employee[], Employee[]>(
  employeesSelector,
  employees => employees.filter(employee => employee.meta.status === 'deleted')
)