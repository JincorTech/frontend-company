import * as React from 'react'
import { Component, MouseEvent } from 'react'
import { connect } from 'react-redux'
import * as CSSModules from 'react-css-modules'

import {
  openConfirmDeletePopup,
  closeConfirmDeletePopup,
  openConfirmAdminPopup,
  closeConfirmAdminPopup,
  openConfirmRmAdminPopup,
  closeConfirmRmAdminPopup,
  openEmployeeCard,
  closeEmployeeCard,
  fetchEmployees,
  makeAdmin,
  unmakeAdmin,
  deleteEmployee,
  resetState
} from '../../../redux/modules/employees/employees'

import {
  activeEmployeesSelector,
  invitedEmployeesSelector,
  deletedEmployeesSelector
} from '../../../selectors/employees/employees'

import { ConfirmPopup } from '../../../redux/modules/employees/employees'
import { Props as EmployeeCardProps } from '../../../components/employees/EmployeeCard'
import { ActiveEmployee, InvitedEmployee, DeletedEmployee } from '../../../redux/modules/employees/employees'
import { UserCompany } from '../../../redux/modules/app/appLayout'

import EmployeesView from '../../../components/employees/EmployeesView/'
import EmployeesPreloader from '../../../components/employees/EmployeesPreloader/'


export type Props = DispatchProps & StateProps

export type StateProps = {
  preloader: boolean
  employees: {
    spinner: boolean
  }
  company: UserCompany
  activeEmployees: ActiveEmployee[]
  invitedEmployees: InvitedEmployee[]
  deletedEmployees: DeletedEmployee[]
  confirmDelete: ConfirmPopup
  confirmAdmin: ConfirmPopup
  confirmRmAdmin: ConfirmPopup
  employeeCard: EmployeeCardProps
}

export type DispatchProps = {
  openConfirmDeletePopup: (id: string) => void
  closeConfirmDeletePopup: () => void
  openConfirmAdminPopup: (id: string) => void
  closeConfirmAdminPopup: () => void
  openConfirmRmAdminPopup: (id: string) => void
  closeConfirmRmAdminPopup: () => void
  openEmployeeCard: (employee: ActiveEmployee) => void
  closeEmployeeCard: () => void
  fetchEmployees: () => void
  inviteEmployees: () => void
  makeAdmin: () => void
  unmakeAdmin: () => void
  deleteEmployee: () => void
  resetState: () => void
}


class Employees extends Component<Props, {}> {
  public componentDidMount(): void {
    this.props.fetchEmployees()
  }

  public componentWillUnmount(): void {
    this.props.resetState()
  }

  public render(): JSX.Element {
    const { preloader } = this.props

    return preloader
      ? <EmployeesPreloader/>
      : <EmployeesView {...this.props}/>
  }
}

const StyledComponent = CSSModules(Employees, require('./styles.css'))

export default connect<StateProps, DispatchProps, {}>(
  (state) => ({
    ...state.employees.employees,
    company: state.app.appLayout.user.company, // TODO SAGA RACE?
    activeEmployees: activeEmployeesSelector(state.employees.employees),
    invitedEmployees: invitedEmployeesSelector(state.employees.employees),
    deletedEmployees: deletedEmployeesSelector(state.employees.employees)
  }),
  {
    openConfirmDeletePopup,
    closeConfirmDeletePopup,
    openConfirmAdminPopup,
    closeConfirmAdminPopup,
    openConfirmRmAdminPopup,
    closeConfirmRmAdminPopup,
    openEmployeeCard,
    closeEmployeeCard,
    fetchEmployees,
    makeAdmin,
    unmakeAdmin,
    deleteEmployee,
    resetState
  }
)(StyledComponent)
